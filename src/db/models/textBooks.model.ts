import { Document, Model, model, Schema } from "mongoose";
import { ITextBook } from "../interfaces/textBook.interface.js";

export type TextBookDocument = ITextBook & Document;

const TextBookSchema = new Schema<TextBookDocument>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    subject: { type: String, required: false },
  },
  {
    collection: "textbooks",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    _id: false,
  }
);

const TextBookModel: Model<TextBookDocument> = model<TextBookDocument>(
  "TextBook",
  TextBookSchema
);

export default TextBookModel;
