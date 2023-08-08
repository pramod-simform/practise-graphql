import { model, Schema } from "mongoose";
import { ILike } from "../interfaces/like.interface.js";

const LikeSchema = new Schema<ILike>({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  postId: { type: String, required: true },
}, {
  collection: "likes",
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  _id: false
});

const LikeModel = model<ILike>("Like", LikeSchema);

export default LikeModel;