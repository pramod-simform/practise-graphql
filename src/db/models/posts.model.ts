import { model, Schema } from "mongoose";
import { IPost } from "../interfaces/post.interface.js";

const PostSchema = new Schema<IPost>({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: false },
}, {
  collection: "posts",
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  _id: false
});

const PostModel = model<IPost>("Post", PostSchema);

export default PostModel;