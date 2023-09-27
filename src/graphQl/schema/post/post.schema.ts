export const PostTypeDef = `
  type Post implements Node {
    id: ID!
    userId: ID! @cacheControl(maxAge: 60)
    heading: String!
    description: String!
    user: User!
    comments: [Comment]
    likes: [Like]
  }
`;