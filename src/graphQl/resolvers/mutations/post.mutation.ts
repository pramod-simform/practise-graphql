import { IPost } from "../../../db/interfaces/post.interface.js";
import { createPost } from "../../../db/services/post.service.js";

export const CreatePostMutation = {
  createPost: async (_: any, args: IPost) => {
    return await createPost(args);
  },
};