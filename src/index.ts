import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { QueryTypeDef } from './graphQl/queries/index.query.js';
// import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';
import { Resolvers } from './graphQl/resolvers/index.resolver.js';
import { NodeTypeDef } from './graphQl/schema/node.schema.js';
import { CommentTypeDef } from './graphQl/schema/post/comment.schema.js';
import { LikeTypeDef } from './graphQl/schema/post/like.schema.js';
import { PostTypeDef } from './graphQl/schema/post/post.schema.js';
import { UserTypeDef } from './graphQl/schema/user/user.schema.js';

// Basic schema
// const typeDefs = `#graphql
//   scalar Odd

//   type MyTest {
//     test: Odd!
//   }

//   type Query {
//     # Echoes the provided odd integer
//     echoOdd(odd: Odd!): MyTest
//   }
// `;

// // Validation function for checking "oddness"
// function oddValue(value: number) {
//   if (typeof value === 'number' && Number.isInteger(value) && value % 2 !== 0) {
//     return value;
//   }
//   throw new GraphQLError('Provided value is not an odd integer', {
//     extensions: { code: 'BAD_USER_INPUT' },
//   });
// }

const resolvers = {
  // Query: {
  // }
  ...Resolvers
  // Odd: new GraphQLScalarType({
  //   name: 'Odd',
  //   description: 'Odd custom scalar type',
  //   parseValue: oddValue,
  //   serialize: oddValue,
  //   parseLiteral(ast) {
  //     if (ast.kind === Kind.INT) {
  //       return oddValue(parseInt(ast.value, 10));
  //     }
  //     throw new GraphQLError('Provided value is not an odd integer', {
  //       extensions: { code: 'BAD_USER_INPUT' },
  //     });
  //   },
  // }),
  // Query: {
  //   echoOdd(_, { odd }) {
  //     return {test: odd};
  //   },
  // },
};

const server = new ApolloServer({
  typeDefs: [QueryTypeDef, NodeTypeDef, UserTypeDef, PostTypeDef, CommentTypeDef, LikeTypeDef],
  resolvers,
});

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server listening at: ${url}`);