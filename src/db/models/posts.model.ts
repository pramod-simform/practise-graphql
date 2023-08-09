import { Document, Model, model, Schema } from "mongoose";
import { IPost } from "../interfaces/post.interface.js";

export type PostDocument = IPost & Document;

const PostSchema = new Schema<PostDocument>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: false },
  },
  {
    collection: "posts",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    _id: false,
  }
);

const PostModel: Model<PostDocument> = model<PostDocument>("Post", PostSchema);

export default PostModel;
