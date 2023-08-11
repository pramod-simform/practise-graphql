export const ColorBookTypeDef = `
  type ColorBook implements Book {
    _id: ID!
    title: String!
    author: User!
    color: String!
  }
`;