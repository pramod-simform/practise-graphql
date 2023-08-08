import { getPosts } from "../../../db/services/post.service.js";
import { getUserDetails } from "../../../db/services/user.service.js";

export const GetUserByIdResolver = {
  getUserById: async (_: any, args: any) => {
    let { id } = args;
    if (!id) {
      throw new Error("User id is missing.");
    }

    return await getUserDetails({ where: { _id: id } });
  },
};

export const GetUserFieldsResolver = {
  User: {
    posts: async (parent: any) => {
      const { _id } = parent;

      return await getPosts({
        where: {
          userId: _id,
        },
      });
    },
  },
};
