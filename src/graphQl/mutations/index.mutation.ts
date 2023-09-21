export const MutationTypeDef = `
  type Mutation {
    createUser(fullName: String!, username: String!, ageGroup: Int!, address: String!): User
    createPost(userId: ID!, heading: String!, description: String!): Post
    createComment(userId: ID!, postId: ID!, note: String!): Comment
    createLike(userId: ID!, postId: ID!): Like

    updateUser(id: ID!, fullName: String!, username: String!, ageGroup: Int!, address: String!): User
    updatePost(id: ID!, userId: ID!, heading: String!, description: String!): Post
    updateComment(id: ID!, userId: ID!, postId: ID!, note: String!): Comment
    updateLike(id: ID!): Boolean
  }
`;
