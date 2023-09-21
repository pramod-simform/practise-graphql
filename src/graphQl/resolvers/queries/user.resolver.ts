import { getPosts } from "../../../db/services/post.service.js";
import { getUserDetails, getUsers } from "../../../db/services/user.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";
import { getSearchTermCondition } from "./utils.resolver.js";

export const GetUserByIdResolver = {
  getUserById: async (_: any, args: any) => {
    let { id } = args;
    if (!id) {
      throw new Error("User id is missing.");
    }

    return getFieldsMappedData(
      "users",
      await getUserDetails({ where: { _id: id } })
    );
  },

  getUsers: async (_: any, args: any) => {
    let { page, limit, searchTerm, sortByOrder, sortByField } = args;
    let searchCond = getSearchTermCondition({
      entityType: "users",
      searchTerm,
    });

    let data = getFieldsMappedData(
      "users",
      await getUsers({
        where: searchCond,
        limit,
        page,
        sortByOrder,
        sortByField,
      })
    );
    return data;
  },
};

export const GetUserFieldsResolver = {
  User: {
    posts: async (parent: any) => {
      const { _id } = parent;

      return getFieldsMappedData(
        "posts",
        await getPosts({
          where: {
            userId: _id,
          },
        })
      );
    },
  },
};
