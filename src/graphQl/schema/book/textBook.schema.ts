export const TextBookTypeDef = `
  type TextBook implements Book {
    id: ID!
    bookName: String!
    writer: User!
    academicSubject: String!
  }
`;