import { ILike } from "../../../db/interfaces/like.interface.js";
import { createLike } from "../../../db/services/like.service.js";

export const CreateLikeMutation = {
  createLike: async (_: any, args: ILike) => {
    return await createLike(args);
  },
};
