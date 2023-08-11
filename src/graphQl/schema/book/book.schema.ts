export const BookTypeDef = `
  interface Book {
    _id: ID!
    title: String!
    author: User!
  }

  union AllBooks = TextBook | ColorBook
`;