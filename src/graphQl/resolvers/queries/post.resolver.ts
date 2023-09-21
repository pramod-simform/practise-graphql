import { getComments } from "../../../db/services/comment.service.js";
import { getLikes } from "../../../db/services/like.service.js";
import { getPostDetails } from "../../../db/services/post.service.js";
import { getUserDetails } from "../../../db/services/user.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";

export const GetPostByIdResolver = {
  getPostById: async (_: any, args: any) => {
    let { id } = args;
    if (!id) {
      throw new Error("Post id is missing.");
    }

    return getFieldsMappedData(
      "posts",
      await getPostDetails({ where: { _id: id } })
    );
  },
};

export const GetPostFieldsResolver = {
  Post: {
    comments: async (parent: any, args: any) => {
      const { id: _id } = parent;

      return getFieldsMappedData(
        "comments",
        await getComments({
          where: {
            postId: _id,
          },
        })
      );
    },
    likes: async (parent: any, args: any) => {
      const { id: _id } = parent;

      return getFieldsMappedData(
        "likes",
        await getLikes({
          where: {
            postId: _id,
          },
        })
      );
    },
    user: async (parent: any, args: any) => {
      const { userId } = parent;

      return getFieldsMappedData(
        "users",
        await getUserDetails({
          where: {
            _id: userId,
          },
        })
      );
    },
  },
};
