import { ApolloServerPlugin, GraphQLRequest } from "@apollo/server";
import { GraphQLError } from "graphql";
import { createLog, fetchLog, updateLog } from "../db/services/log.service.js";
import { IContext } from "../interfaces/context.interface.js";
import { ILog } from "../interfaces/logs.interface.js";

interface DynamicObject {
  [key: string]: any;
}

const LogPlugin: ApolloServerPlugin<IContext> = {
  async requestDidStart() {
    return {
      async willSendResponse(requestContext) {
        const { response, request } = requestContext;
        const { id } = requestContext.contextValue;

        let responseBody: any = {};
        const endTime = +new Date();

        const operationName = _getFieldValue(request, "operationName");

        if (
          response.body.kind === "single" &&
          response.body.singleResult?.data
        ) {
          responseBody = response.body.singleResult;
        }

        if (operationName !== "IntrospectionQuery") {
          const log = await fetchLog({
            where: {
              _id: id,
            },
          });

          if (log) {
            const updateBody: ILog = {
              response: responseBody,
              endTime,
              responseTime: +endTime - (log?.startTime || 0),
            };

            await updateLog({
              where: {
                _id: id,
              },
              updateBody,
            });
          }
        }
      },

      // If any error throw then we will update the log here.
      async didEncounterErrors(requestContext) {
        const { request, response, errors } = requestContext;
        const { id } = requestContext.contextValue;

        const endTime = +new Date();

        const operationName = _getFieldValue(request, "operationName");

        if (operationName !== "IntrospectionQuery" && errors.length) {
          let formattedErrorCodes = "";
          let formattedErrorMessage = errors.reduce(
            (prev: string, curr: GraphQLError) => {
              formattedErrorCodes += curr.extensions.code + " \n ";
              return prev + curr.message + " \n ";
            },
            ""
          );

          formattedErrorCodes = formattedErrorCodes.slice(0, -3);
          formattedErrorMessage = formattedErrorMessage.slice(0, -3);

          const log = await fetchLog({
            where: {
              _id: id,
            },
          });
          if (log) {
            const updateBody: ILog = {
              errorMessage: formattedErrorMessage,
              errorCode: formattedErrorCodes,
              endTime,
              responseTime: +endTime - (log?.startTime || 0),
            };
            await updateLog({
              where: {
                _id: id,
              },
              updateBody,
            });
          }
        }
      },

      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async executionDidStart(requestContext) {
        const { request, contextValue } = requestContext;
        const { id } = contextValue;
        const { query } = request;

        const operationName = _getFieldValue(request, "operationName");

        if (operationName !== "IntrospectionQuery") {
          const variables = _getFieldValue(request, "variables");

          const headers = request.http?.headers;

          const log = await createLog({
            _id: id,
            variables: variables,
            startTime: +new Date(),
            operation: operationName,
            headers,
            query,
          });
        }
      },
    };
  },
};

const _getFieldValue = (request: GraphQLRequest, fieldName: string) => {
  var requestBody = request.http?.body as DynamicObject;
  const fieldValue = requestBody[fieldName];
  return fieldValue;
};

export default LogPlugin;
