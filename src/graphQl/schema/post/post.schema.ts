export const PostTypeDef = `
  type Post implements Node {
    _id: ID!
    userId: ID!
    title: String!
    content: String!
    user: User!
    comments: [Comment]
    likes: [Like]
  }
`;