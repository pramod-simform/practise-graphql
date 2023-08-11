import { ApolloServer } from "@apollo/server";
import { createServer } from "http";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

import createConnection from "./db/connection.js";
import { MutationTypeDef } from "./graphQl/mutations/index.mutation.js";

import { expressMiddleware } from "@apollo/server/express4";
import { QueryTypeDef } from "./graphQl/queries/index.query.js";
import { Resolvers } from "./graphQl/resolvers/index.resolver.js";
import { NodeTypeDef } from "./graphQl/schema/node.schema.js";
import { CommentTypeDef } from "./graphQl/schema/post/comment.schema.js";
import { LikeTypeDef } from "./graphQl/schema/post/like.schema.js";
import { PostTypeDef } from "./graphQl/schema/post/post.schema.js";
import { UserTypeDef } from "./graphQl/schema/user/user.schema.js";
import { SubscriptionTypeDef } from "./graphQl/subscriptions/index.subscription.js";

import "./utils/pubSub.utils.js";

const resolvers = {
  ...Resolvers,
};

const schema = makeExecutableSchema({
  typeDefs: [
    QueryTypeDef,
    MutationTypeDef,
    NodeTypeDef,
    UserTypeDef,
    PostTypeDef,
    CommentTypeDef,
    LikeTypeDef,
    SubscriptionTypeDef,
  ],
  resolvers,
});

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
      console.log("WS Connected")
    },
    onDisconnect() {
      console.log("WS Disconnected!");
    },
  },
  wsServer
);

const server = new ApolloServer({
  schema,
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
  expressMiddleware(server)
);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/`);
    console.log(`🚀 Subscription endpoint ready at ws://localhost:4000/`);

    resolve();
  })
);
