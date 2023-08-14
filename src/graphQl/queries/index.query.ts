export const QueryTypeDef = `
  type Query {
    getNodeById(id: ID!): Node
    getUserById(id: ID!): User
    getPostById(id: ID!): Post
    getCommentById(id: ID!): Comment
    getLikeById(id: ID!): Like
    getBooks: [AllBooks!]!
    hello: String @upper
    helloDate: String @date(format: "DD/MM/YYYY")
  }
`;