export const ColorBookTypeDef = `
  type ColorBook implements Book {
    id: ID!
    bookName: String!
    writer: User!
    color: String!
  }
`;