import { getComments } from "../../../db/services/comment.service.js";
import { getLikes } from "../../../db/services/like.service.js";
import { getPostDetails } from "../../../db/services/post.service.js";
import { getUserDetails } from "../../../db/services/user.service.js";

export const GetPostByIdResolver = {
  getPostById: async (_: any, args: any) => {
    let { id } = args;
    if (!id) {
      throw new Error("Post id is missing.");
    }

    return await getPostDetails({ where: { _id: id } });
  },
};

export const GetPostFieldsResolver = {
  Post: {
    comments: async (parent: any, args: any) => {
      const { _id } = parent;

      return await getComments({
        where: {
          postId: _id,
        },
      });
    },
    likes: async (parent: any, args: any) => {
      const { _id } = parent;

      return await getLikes({
        where: {
          postId: _id,
        },
      });
    },
    user: async (parent: any, args: any) => {
      const { userId } = parent;

      return await getUserDetails({
        where: {
          _id: userId,
        },
      });
    },
  },
};
