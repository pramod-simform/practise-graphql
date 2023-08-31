export const UserTypeDef = `
  type User implements Node {
    _id: ID!
    name: String!
    email: String!
    age: Int!
    location: String!
    posts: [Post!]!
    createdAt: Date
    contactDetails: JSON
    paginationInfo: PaginationInfo
  }
`;
