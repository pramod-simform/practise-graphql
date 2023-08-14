import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import moment from "moment";

function dateDirective(directiveName: string) {
  return {
    dateDirectiveTypeDefs: `directive @${directiveName}(format: String) on FIELD_DEFINITION`,
    dateDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD](fieldConfig) {
          const dateDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0];
          if (dateDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            const { format } = dateDirective;
            fieldConfig.resolve = async (source, args, context, info) => {
              const date = await resolve(source, args, context, info);
              if (date) {
                return moment(date).format(format);
              }
              return date;
            };
            return fieldConfig;
          }
        },
      }),
  };
}

let objInstance = dateDirective("date");

export const dateDirectiveTypeDefs = objInstance.dateDirectiveTypeDefs;
export const dateDirectiveTransformer = objInstance.dateDirectiveTransformer;
