import { Document, Model, model, Schema } from "mongoose";
import { IColorBook } from "../interfaces/colorBook.interface.js";

export type ColorBookDocument = IColorBook & Document;

const ColorBookSchema = new Schema<ColorBookDocument>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    color: { type: String, required: false },
  },
  {
    collection: "color_books",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    _id: false,
  }
);

const ColorBookModel: Model<ColorBookDocument> = model<ColorBookDocument>(
  "ColorBook",
  ColorBookSchema
);

export default ColorBookModel;
