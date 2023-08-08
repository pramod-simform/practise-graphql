export const LikeTypeDef = `
  type Like implements Node {
    id: ID!
    userId: ID!
    postId: ID!
    user: User!
    post: Post!
  }
`;