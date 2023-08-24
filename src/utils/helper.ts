import { GraphQLRequest } from "@apollo/server";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { ObjectSchema, ValidationResult } from "joi";

interface DynamicObject {
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
  var requestBody = request.http?.body as DynamicObject;
  const fieldValue = requestBody[fieldName];
  return fieldValue + "";
};
