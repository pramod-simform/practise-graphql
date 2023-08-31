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
    testError: String
    testValidation(input: UserEmailInput): User
    getUsers(page: Int!, limit: Int!, searchTerm: String, sortByOrder: String, sortByField: String): [User]
    paginationInfo(entityType: String!, limit: Int!, page: Int!, searchTerm: String): PaginationInfo!
  }
`;