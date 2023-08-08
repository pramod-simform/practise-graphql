export const LikeTypeDef = `
  type Like implements Node {
    _id: ID!
    userId: ID!
    postId: ID!
    user: User!
    post: Post!
  }
`;