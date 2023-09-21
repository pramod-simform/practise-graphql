import { GraphQLRequest } from "@apollo/server";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { ObjectSchema, ValidationResult } from "joi";
import { RootMapper } from "../mappers/index.mapper.js";

interface IDynamicObject {
  [key: string]: any;
}

export const validateJOISchema = (schema: ObjectSchema, data: any) => {
  const validationRes: ValidationResult = schema.validate(data, {
    abortEarly: true,
    errors: {
      label: false,
    },
  });
  if (validationRes.error) {
    throw new GraphQLError(validationRes.error.message, {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    });
  }
};

export const getFieldValue = (request: GraphQLRequest, fieldName: string) => {
  var requestBody = request.http?.body as IDynamicObject;
  const fieldValue = requestBody[fieldName];
  return fieldValue + "";
};

/**
 * Maps the data based on the specified type and mapping.
 * @param type Type of the mapper (e.g., users, posts).
 * @param responseData Response data to be mapped.
 * @returns Mapped data.
 */
export const getFieldsMappedData = (type: string, responseData: any): any => {
  const keyMapper = RootMapper[type as keyof typeof RootMapper];

  if (keyMapper && responseData) {
    if (Array.isArray(responseData)) {
      return responseData.map((row) => _getMappedObject(type, keyMapper, row));
    } else if (typeof responseData === "object") {
      return _getMappedObject(type, keyMapper, responseData);
    }
  }

  // If mapper for the given type is not found, return the data as is.
  return responseData;
};

/**
 * Helper method to map an object based on the mapping keys.
 * @param type Type of the mapper.
 * @param keyMapper Key mappings object.
 * @param dataObject Data object.
 * @returns Mapped data object.
 */
function _getMappedObject(
  type: string,
  keyMapper: IDynamicObject,
  dataObject: IDynamicObject
): IDynamicObject {
  const formattedRowData: IDynamicObject = {};

  for (const key in dataObject) {
    const mappedKey = keyMapper[key as keyof typeof keyMapper] || key;

    if (Array.isArray(dataObject[key])) {
      formattedRowData[mappedKey] = dataObject[key].map((item: any) =>
        getFieldsMappedData(type, item)
      );
    } else {
      formattedRowData[mappedKey] = dataObject[key];
    }
  }

  return formattedRowData;
}
