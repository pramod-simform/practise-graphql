export const TestTypeDef = `
  type TestSubQuery {
    id: String
    fullName: String
    username: String
    post(postId: ID!): Post
  }
`;