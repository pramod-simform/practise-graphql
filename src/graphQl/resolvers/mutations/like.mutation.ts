import { ILikeRequest as ILike } from "../../../interfaces/like.interface.js";
import { createLike, updateLike } from "../../../db/services/like.service.js";

export const LikeMutations = {
  createLike: async (_: any, args: ILike): Promise<ILike> => {
    return await createLike(args);
  },

  updateLike: async (_: any, args: ILike): Promise<Boolean | null> => {
    return await updateLike(args);
  },
};
