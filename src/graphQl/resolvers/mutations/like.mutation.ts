import { ILikeRequest as ILike } from "../../../interfaces/like.interface.js";
import { createLike } from "../../../db/services/like.service.js";

export const CreateLikeMutation = {
  createLike: async (_: any, args: ILike) => {
    return await createLike(args);
  },
};
