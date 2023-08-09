import { Document, Model, model, Schema } from "mongoose";
import { ILike } from "../interfaces/like.interface.js";

export type LikeDocument = ILike & Document;

const LikeSchema = new Schema<LikeDocument>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    postId: { type: String, required: true },
  },
  {
    collection: "likes",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    _id: false,
  }
);

const LikeModel: Model<LikeDocument> = model<LikeDocument>("Like", LikeSchema);

export default LikeModel;
