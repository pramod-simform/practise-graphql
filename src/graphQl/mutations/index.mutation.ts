export const MutationTypeDef = `
  type Mutation {
    createUser(name: String!, email: String!, age: Int!, location: String!): User
    createPost(userId: ID!, title: String!, content: String!): Post
    createComment(userId: ID!, postId: ID!, content: String!): Comment
    createLike(userId: ID!, postId: ID!): Like

    updateUser(_id: ID!, name: String!, email: String!, age: Int!, location: String!): User
    updatePost(_id: ID!, userId: ID!, title: String!, content: String!): Post
    updateComment(_id: ID!, userId: ID!, postId: ID!, content: String!): Comment
    updateLike(_id: ID!): Boolean
  }
`;
