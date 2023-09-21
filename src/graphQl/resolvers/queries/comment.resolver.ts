import { getCommentDetails } from "../../../db/services/comment.service.js";
import { getPostDetails } from "../../../db/services/post.service.js";
import { getUserDetails } from "../../../db/services/user.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";

export const GetCommentByIdResolver = {
  getCommentById: async (_: any, args: any) => {
    let { id } = args;
    if (!id) {
      throw new Error("Comment id is missing.");
    }

    return getFieldsMappedData(
      "comments",
      await getCommentDetails({ where: { _id: id } })
    );
  },
};

export const GetCommentFieldsResolver = {
  Comment: {
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
    post: async (parent: any, args: any) => {
      const { postId } = parent;

      return getFieldsMappedData(
        "posts",
        await getPostDetails({
          where: {
            _id: postId,
          },
        })
      );
    },
  },
};
