import { ApolloServer } from "@apollo/server";
import { createServer } from "http";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import {
  constraintDirective,
  constraintDirectiveTypeDefs
} from "graphql-constraint-directive";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { expressMiddleware } from "@apollo/server/express4";
import { useServer } from "graphql-ws/lib/use/ws";
import { v4 as uuidv4 } from "uuid";
import { WebSocketServer } from "ws";

import { makeExecutableSchema } from "@graphql-tools/schema";

import createConnection from "./db/connection.js";

import { Resolvers } from "./graphQl/resolvers/index.resolver.js";

import { dateDirectiveTransformer } from "./graphQl/schema/customDirectives/dateFormat.directive.js";
import UppercaseDirective from "./graphQl/schema/customDirectives/uppercase.directive.js";

import TypeDefs from "./graphQl/schema/index.schema.js";

import { IContext } from "./interfaces/context.interface.js";

import LogPlugin from "./plugins/log.plugin.js";

import "./utils/pubSub.utils.js";

const resolvers = {
  ...Resolvers,
};

const subgraphSchema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, ...TypeDefs],
  resolvers,
});

/**
 * Custom directives
 */
const schema = [
  UppercaseDirective("upper"),
  dateDirectiveTransformer,
  constraintDirective(),
].reduce((curSchema, transformer) => {
  return transformer(curSchema);
}, subgraphSchema);

createConnection();

const app = express();
app.use(cors());
const httpServer = createServer(app);

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
  includeStacktraceInErrorResponses: false,
  formatError: (formattedError, error) => {
    // Return a different error message
    if (formattedError?.extensions?.code === "FORBIDDEN") {
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

    // createEnvelopQueryValidationPlugin(),

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
                    (row: any) => row._id
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
    context: async () => {
      return {
        id: uuidv4(),
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
