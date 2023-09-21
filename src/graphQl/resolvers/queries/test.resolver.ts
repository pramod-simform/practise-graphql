import { GraphQLError } from "graphql";
import { getPostDetails } from "../../../db/services/post.service.js";
import { getUserDetails } from "../../../db/services/user.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";

export const TestResolver = {
  testError: async () => {
    throw new GraphQLError("You are not authorized to perform this action.", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  },

  testValidation: async (_: any, args: any) => {
    return getFieldsMappedData(
      "users",
      await getUserDetails({
        where: {
          email: args.input.username,
        },
      })
    );
  },

  hello() {
    return "hello world";
  },

  helloDate() {
    return new Date();
  },

  testSubQuery: async (_: any, args: any) => {
    let response: { [key: string]: any } = {};
    let { userId } = args;

    let userInfo = getFieldsMappedData(
      "users",
      await getUserDetails({
        where: {
          _id: userId,
        },
      })
    );

    if (userInfo) {
      response = { ...response, ...userInfo };
    }

    return response;
  },
};

export const TestSubQueryFieldResolver = {
  TestSubQuery: {
    post: async (_: any, args: any) => {
      const { postId } = args;

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
