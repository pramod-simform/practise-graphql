import { ApolloServer } from "@apollo/server";
import { createServer } from "http";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";

import { expressMiddleware } from "@apollo/server/express4";
import { useServer } from "graphql-ws/lib/use/ws";
import { v4 as uuidv4 } from "uuid";
import { WebSocketServer } from "ws";

import { KeyvAdapter } from "@apollo/utils.keyvadapter";
import Keyv from "keyv";

import { makeExecutableSchema } from "@graphql-tools/schema";

import { decodeJWTToken } from "./utils/jwt.js";

import createConnection from "./db/connection.js";

import { Resolvers } from "./graphQl/resolvers/index.resolver.js";

import AuthDirective from "./graphQl/schema/customDirectives/auth.directive.js";
import { dateDirectiveTransformer } from "./graphQl/schema/customDirectives/dateFormat.directive.js";
import UppercaseDirective from "./graphQl/schema/customDirectives/uppercase.directive.js";

import TypeDefs from "./graphQl/schema/index.schema.js";

import { IContext } from "./interfaces/context.interface.js";

import LogPlugin from "./plugins/log.plugin.js";

import { memcache } from "./cache/memcached.cache.js";
import authLimiter from "./middlewares/rateLimiter.js";
import { validateJOISchema } from "./utils/helper.js";
import "./utils/pubSub.utils.js";
import ValidationSchemas from "./validation/index.validation.js";
import depthLimit from "./validators/depthLimit.js";

config();

const resolvers = {
  ...Resolvers,
};

const subgraphSchema = makeExecutableSchema({
  typeDefs: TypeDefs,
  resolvers,
});

/**
 * Custom directives
 */
const schema = [
  UppercaseDirective("upper"),
  dateDirectiveTransformer,
  AuthDirective("auth"),
].reduce((curSchema, transformer) => {
  return transformer(curSchema);
}, subgraphSchema);

createConnection();

const app = express();
app.use(cors());
app.use(authLimiter);

const httpServer = createServer(app);

httpServer.setTimeout(5 * 1000); // 5 * 1000ms timeout

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: "/",
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer(
  {
    schema, // As before, ctx is the graphql-ws Context where connectionParams live.
    onConnect: async (ctx) => {
      console.log("WS Connected");
    },
    onDisconnect() {
      console.log("WS Disconnected!");
    },
  },
  wsServer
);

const server = new ApolloServer<IContext>({
  schema,
  cache: new KeyvAdapter(new Keyv({ store: memcache })),
  validationRules: [depthLimit(10)],
  introspection: true, // This should only true for development env
  includeStacktraceInErrorResponses: false,
  formatError: (formattedError, error) => {
    const code = formattedError?.extensions?.code;

    // Return a different error message
    if (code === "FORBIDDEN") {
      return {
        ...formattedError,
        message: "Your query doesn't match the schema. Try double-checking it!",
      };
    }

    // Otherwise return the formatted error. This error can also
    // be manipulated in other ways, as long as it's returned.
    return formattedError;
  },
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    {
      /**
       * Filtering the response of the get books query.
       * There we are getting some blank objects due to union.
       * So, we have filtered them and update the response.
       */
      async requestDidStart() {
        return {
          async willSendResponse(requestContext) {
            const { response } = requestContext;
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
                    (row: any) => row._id || row.id
                  );
              }
            }
          },
        };
      },
    },
    LogPlugin,
  ],
});

// Ensure we wait for our server to start
await server.start();

app.use(
  "/",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async (requestContext) => {
      const body = requestContext.req.body;
      const token = requestContext.req.headers.authorization || "";

      let tokenData: any;

      const operationName: string = requestContext.req.body?.operationName;
      
      if (operationName != "IntrospectionQuery" && body?.variables?.input) {
        const variables = body?.variables?.input;
        let schema = ValidationSchemas[operationName];
        if (schema) {
          validateJOISchema(schema, variables);
        }
      }

      if (operationName != "IntrospectionQuery") {
        tokenData = decodeJWTToken(token);
      }

      return {
        id: uuidv4(),
        tokenData,
      };
    },
  })
);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000/`);
    console.log(`Subscription endpoint ready at ws://localhost:4000/`);

    resolve();
  })
);
