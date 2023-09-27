import { getPosts } from "../../../db/services/post.service.js";
import { getUserDetails, getUsers } from "../../../db/services/user.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";
import { getFieldNodes, getSearchTermCondition } from "./utils.resolver.js";

export const GetUserByIdResolver = {
  getUserById: async (_: any, args: any, __: any, info: any) => {
    let queryFields = getFieldNodes({
      field: info.fieldNodes[0],
      mappingFieldType: "users",
      specificFieldValues: "getUserById",
    });
    let { id } = args;
    if (!id) {
      throw new Error("User id is missing.");
    }

    return getFieldsMappedData(
      "users",
      await getUserDetails({ where: { _id: id }, selectedFields: queryFields })
    );
  },

  getUsers: async (_: any, args: any, __: any, info: any) => {
    let queryFields = getFieldNodes({
      field: info.fieldNodes[0],
      mappingFieldType: "users",
      specificFieldValues: "getUsers",
    });

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
        selectedFields: queryFields
      })
    );
    return data;
  },
};

export const GetUserFieldsResolver = {
  User: {
    posts: async (parent: any, args: any, __: any, info: any) => {
      const { id: _id } = parent;
      
      let queryFields = getFieldNodes({
        field: info.fieldNodes[0],
        mappingFieldType: "posts",
        specificFieldValues: "posts",
      });

      return getFieldsMappedData(
        "posts",
        await getPosts({
          where: {
            userId: _id,
          },
          selectedFields: queryFields
        })
      );
    },
  },
};
