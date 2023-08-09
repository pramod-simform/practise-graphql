import { model, Schema, Document, Model } from "mongoose";
import { IComment } from "../interfaces/comment.interface.js";

export type CommentDocument = IComment & Document;

const CommentSchema = new Schema<CommentDocument>({
  _id: { type: String, required: true }, // Use your custom _id field
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  content: { type: String, required: true },
}, {
  collection: "comments",
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  _id: false // Disable auto-generation of MongoDB _id
});

const CommentModel: Model<CommentDocument> = model<CommentDocument>("Comment", CommentSchema);

export default CommentModel;
