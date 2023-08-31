export const TestTypeDef = `
  type TestSubQuery {
    _id: String
    name: String
    email: String
    post(postId: String): Post
  }
`;