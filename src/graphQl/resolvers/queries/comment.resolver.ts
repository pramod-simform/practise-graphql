import { getCommentDetails, getComments } from "../../../db/services/comment.service.js";
import { getLikes } from "../../../db/services/like.service.js";
import { getPostDetails } from "../../../db/services/post.service.js";
import { getUserDetails } from "../../../db/services/user.service.js";

export const GetCommentByIdResolver = {
  getCommentById: async (_: any, args: any) => {
    let { id } = args;
    if (!id) {
      throw new Error("Comment id is missing.");
    }

    return await getCommentDetails({ where: { _id: id } });
  },
};

export const GetCommentFieldsResolver = {
  Comment: {
    user: async (parent: any, args: any) => {
      const { userId } = parent;

      return await getUserDetails({
        where: {
          _id: userId,
        },
      });
    },
    post: async (parent: any, args: any) => {
      const { postId } = parent;

      return await getPostDetails({
        where: {
          _id: postId,
        },
      });
    },
  },
};
