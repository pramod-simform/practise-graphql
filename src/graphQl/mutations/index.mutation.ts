export const MutationTypeDef = `
  type Mutation {
    createUser(name: String!, email: String!, age: Int!, location: String!): User
    createPost(userId: ID!, title: String!, content: String!): Post
    createComment(userId: ID!, postId: ID!, content: String!): Comment
    createLike(userId: ID!, postId: ID!): Like
  }
`;
