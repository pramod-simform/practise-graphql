import { IPostRequest as IPost } from "../../../interfaces/post.interface.js";
import { createPost, updatePost } from "../../../db/services/post.service.js";

export const PostMutations = {
  createPost: async (_: any, args: IPost) => {
    return await createPost(args);
  },

  updatePost: async (_: any, args: IPost) => {
    return await updatePost(args);
  },
};
