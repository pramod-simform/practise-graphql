import { getCommentDetails } from "../../../db/services/comment.service.js";
import { getPostDetails } from "../../../db/services/post.service.js";
import { getUserDetails } from "../../../db/services/user.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";
import { getFieldNodes } from "./utils.resolver.js";

export const GetCommentByIdResolver = {
  getCommentById: async (_: any, args: any, __: any, info: any) => {
    let queryFields = getFieldNodes({
      field: info.fieldNodes[0],
      mappingFieldType: "comments",
      specificFieldValues: "getCommentById",
    });
    
    // I have added post and user id here intentionally,
    // Because maybe user can query for the posts and users,
    // But in this case, its possible, he/she not add the post and user id in the query,
    // So in this case, we have to add these two fields explicitly.
    if (!queryFields.postId) {
      queryFields["postId"] = 1;
    }

    if (!queryFields.userId) {
      queryFields["userId"] = 1;
    }

    let { id } = args;
    if (!id) {
      throw new Error("Comment id is missing.");
    }

    return getFieldsMappedData(
      "comments",
      await getCommentDetails({
        where: { _id: id },
        selectedFields: queryFields,
      })
    );
  },
};

export const GetCommentFieldsResolver = {
  Comment: {
    user: async (parent: any, _: any, __: any, info: any) => {
      let queryFields = getFieldNodes({
        field: info.fieldNodes[0],
        mappingFieldType: "users",
        specificFieldValues: "user",
      });
      const { userId } = parent;

      return getFieldsMappedData(
        "users",
        await getUserDetails({
          where: {
            _id: userId,
          },
          selectedFields: queryFields,
        })
      );
    },
    post: async (parent: any, _: any, __: any, info: any) => {
      let queryFields = getFieldNodes({
        field: info.fieldNodes[0],
        mappingFieldType: "posts",
        specificFieldValues: "post",
      });
      const { postId } = parent;
      const data = await getFieldsMappedData(
        "posts",
        await getPostDetails({
          where: {
            _id: postId,
          },
          selectedFields: queryFields,
        })
      );
      return data;
    },
  },
};
