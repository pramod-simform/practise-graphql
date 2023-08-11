import { v4 as uuidv4 } from "uuid";

import { IColorBookRequest } from "../../interfaces/colorBook.interface.js";
import ColorBookModel from "../models/colorBooks.model.js";

export const getColorBookDetails = async ({ where }: { where: any }) => {
  const ColorBook: IColorBookRequest | null = await ColorBookModel.findOne(
    where
  ).lean();
  if (ColorBook) {
    return ColorBook;
  }
  return null;
};

export const getColorBooks = async ({ where }: { where: any }) => {
  const ColorBooks: [IColorBookRequest] = await ColorBookModel.find(
    where
  ).lean();
  return ColorBooks;
};

export const createColorBook = async ({
  author,
  title,
  color,
}: IColorBookRequest): Promise<IColorBookRequest> => {
  const ColorBookObj = new ColorBookModel({
    _id: uuidv4(),
    title,
    author,
    color,
  });

  return ColorBookObj.save();
};

export const updateColorBook = async (
  updateBody: IColorBookRequest
): Promise<IColorBookRequest | null> => {
  const { _id } = updateBody;

  const ColorBook = await ColorBookModel.findById(_id);
  if (ColorBook) {
    Object.assign(ColorBook, updateBody);

    return ColorBook.save();
  }
  return null;
};
