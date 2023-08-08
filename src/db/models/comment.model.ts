import { model, Schema } from "mongoose";
import { IComment } from "../interfaces/comment.interface.js";

const CommentSchema = new Schema<IComment>({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  content: { type: String, required: true },
}, {
  collection: "comments",
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  _id: false
});

const CommentModel = model<IComment>("Comment", CommentSchema);

export default CommentModel;