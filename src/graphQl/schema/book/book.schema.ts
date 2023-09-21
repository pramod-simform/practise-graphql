export const BookTypeDef = `
  interface Book {
    id: ID!
    bookName: String!
    writer: User!
  }

  union AllBooks = TextBook | ColorBook
`;