import { getLikeDetails } from "../../../db/services/like.service.js";
import { getPostDetails } from "../../../db/services/post.service.js";
import { getUserDetails } from "../../../db/services/user.service.js";

export const GetLikeByIdResolver = {
  getLikeById: async (_: any, args: any) => {
    let { id } = args;
    if (!id) {
      throw new Error("Like id is missing.");
    }

    return await getLikeDetails({ where: { _id: id } });
  },
};

export const GetLikeFieldsResolver = {
  Like: {
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
