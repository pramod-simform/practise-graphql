export const UserTypeDef = `
  type User implements Node @auth(roles: ["Admin"]) {
    _id: ID!
    name: String! @auth(roles: ["Sub_Admin"])
    email: String!
    age: Int!
    location: String!
    posts: [Post!]!
    createdAt: Date
    contactDetails: JSON
    paginationInfo: PaginationInfo
  }
`;
