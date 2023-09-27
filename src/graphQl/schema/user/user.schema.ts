export const UserTypeDef = `
  type User implements Node @auth(roles: ["Admin"]) @cacheControl(maxAge: 240) {
    id: ID!
    fullName: String! #@auth(roles: ["Sub_Admin"])
    username: String!
    ageGroup: Int!
    address: String!
    posts: [Post!]!
    createdAt: Date
    contactInfo: JSON
  }
`;
