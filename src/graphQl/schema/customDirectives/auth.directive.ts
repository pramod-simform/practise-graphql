// Source: https://the-guild.dev/graphql/tools/docs/schema-directives#enforcing-access-permissions

import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLSchema } from "graphql";

const typeDirectiveArgumentMaps: Record<string, any> = {};

export const AuthDirectiveTypeDefs = `
  directive @auth(roles: [String]) on OBJECT | FIELD_DEFINITION
`;

function AuthDirective(
  directiveName: string
): (schema: GraphQLSchema) => GraphQLSchema {
  return (schema) =>
    mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig: any, _: any, typeName: any) => {
        const authDirective =
          getDirective(schema, fieldConfig, directiveName)?.[0] ??
          typeDirectiveArgumentMaps[typeName];

        if (authDirective) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          return {
            ...fieldConfig,
            resolve: async function (source, args, context, info) {
              const result = await resolve(source, args, context, info);
              if (authDirective.roles.includes(context.tokenData.Role)) {
                return result;
              }
              return null;
            },
          };
        }
      },
      [MapperKind.TYPE]: (fieldConfig) => {
        const authDirective = getDirective(
          schema,
          fieldConfig,
          directiveName
        )?.[0];
        if (authDirective) {
          typeDirectiveArgumentMaps[fieldConfig.name] = authDirective;
        }
        return undefined;
      },
    });
}

export default AuthDirective;
