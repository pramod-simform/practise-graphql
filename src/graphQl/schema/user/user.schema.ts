export const UserTypeDef = `
  type User implements Node {
    id: ID!
    name: String!
    email: String!
    age: Int!
    location: String!
    posts: [Post!]!
  }
`;
