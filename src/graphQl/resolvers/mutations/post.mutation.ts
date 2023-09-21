import { IPostRequest as IPost } from "../../../interfaces/post.interface.js";
import { createPost, updatePost } from "../../../db/services/post.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";

export const PostMutations = {
  createPost: async (_: any, args: IPost) => {
    return getFieldsMappedData("posts", await createPost(args));
  },

  updatePost: async (_: any, args: IPost) => {
    return getFieldsMappedData("posts", await updatePost(args));
  },
};
