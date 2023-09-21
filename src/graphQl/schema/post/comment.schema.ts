export const CommentTypeDef = `
  type Comment implements Node {
    id: ID!
    userId: ID!
    postId: ID!
    note: String!
    user: User!
    post: Post!
  }
`;