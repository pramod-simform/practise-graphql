export const QueryTypeDef = `
  type Query {
    getNodeById(id: ID!): Node
    getUserById(id: ID!): User
    getPostById(id: ID!): Post
    getCommentById(id: ID!): Comment
    getLikeById(id: ID!): Like
  }
`;