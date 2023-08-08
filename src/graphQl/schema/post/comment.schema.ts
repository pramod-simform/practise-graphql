export const CommentTypeDef = `
  type Comment implements Node {
    _id: ID!
    userId: ID!
    postId: ID!
    content: String!
    user: User!
    post: Post!
  }
`;