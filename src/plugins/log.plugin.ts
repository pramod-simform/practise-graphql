import { ApolloServerPlugin } from "@apollo/server";
import { GraphQLError } from "graphql";
import { createLog, fetchLog, updateLog } from "../db/services/log.service.js";
import { IContext } from "../interfaces/context.interface.js";
import { ILog } from "../interfaces/logs.interface.js";

const LogPlugin: ApolloServerPlugin<IContext> = {
  async requestDidStart() {
    return {
      async willSendResponse(requestContext) {
        const { response, request } = requestContext;
        const { id } = requestContext.contextValue;

        let responseBody: any = {};
        const endTime = +new Date();

        const operationName =
          request.http?.body &&
          request.http.body &&
          typeof request.http.body === "object" &&
          "operationName" in request.http.body
            ? request.http.body.operationName
            : "";

        if (
          response.body.kind === "single" &&
          response.body.singleResult?.data
        ) {
          if (
            response.body.singleResult?.data?.getBooks &&
            Array.isArray(response.body.singleResult?.data?.getBooks)
          ) {
            response.body.singleResult.data.getBooks =
              response.body.singleResult.data.getBooks.filter(
                (row: any) => row._id
              );
          }

          responseBody = response.body.singleResult?.data;
        }

        if (
          response.body.kind === "single" &&
          response.body.singleResult?.errors &&
          Array.isArray(response.body.singleResult?.errors)
        ) {
          response.body.singleResult.errors =
            response.body.singleResult?.errors.map((row: any) => {
              if (row.id) {
                delete row.id;
              }
              return row;
            });
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

        const operationName =
          request.http?.body &&
          request.http.body &&
          typeof request.http.body === "object" &&
          "operationName" in request.http.body
            ? request.http.body.operationName
            : "";

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

        const operationName =
          request.http?.body &&
          request.http.body &&
          typeof request.http.body === "object" &&
          "operationName" in request.http.body
            ? request.http.body.operationName
            : "";

        if (operationName !== "IntrospectionQuery") {
          const variables =
            request.http?.body &&
            request.http.body &&
            typeof request.http.body === "object" &&
            "variables" in request.http.body
              ? request.http.body.variables
              : "";

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

export default LogPlugin;
