import { ILikeRequest as ILike } from "../../../interfaces/like.interface.js";
import { createLike, updateLike } from "../../../db/services/like.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";

export const LikeMutations = {
  createLike: async (_: any, args: ILike): Promise<ILike> => {
    return getFieldsMappedData("likes", await createLike(args));
  },

  updateLike: async (_: any, args: ILike): Promise<Boolean | null> => {
    return getFieldsMappedData("likes", await updateLike(args));
  },
};
