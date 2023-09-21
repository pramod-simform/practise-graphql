export const PostTypeDef = `
  type Post implements Node {
    id: ID!
    userId: ID!
    heading: String!
    description: String!
    user: User!
    comments: [Comment]
    likes: [Like]
  }
`;