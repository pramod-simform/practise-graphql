import { v4 as uuidv4 } from "uuid";

import { ILikeRequest as ILike } from "../../interfaces/like.interface.js";
import LikeModel from "../models/likes.model.js";

export const getLikeDetails = async ({ where }: { where: any }) => {
  const Like: ILike | null = await LikeModel.findOne(where).lean();
  if (Like) {
    return Like;
  }
  return null;
};

export const getLikes = async ({ where }: { where: any }) => {
  const Likes: [ILike] = await LikeModel.find(where).lean();
  return Likes;
};

export const createLike = async ({ userId, postId }: ILike): Promise<ILike> => {
  const LikeObj = new LikeModel({
    _id: uuidv4(),
    userId,
    postId,
  });

  return (await LikeObj.save()).toObject();
};

export const updateLike = async (
  updateBody: ILike
): Promise<Boolean | null> => {
  const { id: _id } = updateBody;

  const Like = await LikeModel.findById(_id);
  if (Like) {
    return !!(await LikeModel.deleteOne({ _id }, { lean: true }));
  }
  return null;
};
