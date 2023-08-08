import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import createConnection from './db/connection.js';
import { MutationTypeDef } from './graphQl/mutations/index.mutation.js';

import { QueryTypeDef } from './graphQl/queries/index.query.js';
import { Resolvers } from './graphQl/resolvers/index.resolver.js';
import { NodeTypeDef } from './graphQl/schema/node.schema.js';
import { CommentTypeDef } from './graphQl/schema/post/comment.schema.js';
import { LikeTypeDef } from './graphQl/schema/post/like.schema.js';
import { PostTypeDef } from './graphQl/schema/post/post.schema.js';
import { UserTypeDef } from './graphQl/schema/user/user.schema.js';

createConnection();

const resolvers = {
  ...Resolvers
};

const server = new ApolloServer({
  typeDefs: [QueryTypeDef, MutationTypeDef, NodeTypeDef, UserTypeDef, PostTypeDef, CommentTypeDef, LikeTypeDef],
  resolvers,
});

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server listening at: ${url}`);