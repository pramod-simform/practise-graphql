export const TextBookTypeDef = `
  type TextBook implements Book {
    _id: ID!
    title: String!
    author: User!
    subject: String!
  }
`;