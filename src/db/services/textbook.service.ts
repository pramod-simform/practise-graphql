import { v4 as uuidv4 } from "uuid";

import { ITextBookRequest } from "../../interfaces/textBook.interface.js";
import TextBookModel from "../models/textBooks.model.js";

export const getTextBookDetails = async ({ where }: { where: any }) => {
  const TextBook: ITextBookRequest | null = await TextBookModel.findOne(
    where
  ).lean();
  if (TextBook) {
    return TextBook;
  }
  return null;
};

export const getTextBooks = async ({ where }: { where: any }) => {
  const TextBooks: [ITextBookRequest] = await TextBookModel.find(where).lean();
  return TextBooks;
};

export const createTextBook = async ({
  author,
  title,
  subject,
}: ITextBookRequest): Promise<ITextBookRequest> => {
  const TextBookObj = new TextBookModel({
    _id: uuidv4(),
    title,
    author,
    subject,
  });

  return TextBookObj.save();
};

export const updateTextBook = async (
  updateBody: ITextBookRequest
): Promise<ITextBookRequest | null> => {
  const { _id } = updateBody;

  const TextBook = await TextBookModel.findById(_id);
  if (TextBook) {
    Object.assign(TextBook, updateBody);

    return TextBook.save();
  }
  return null;
};
