import { GraphQLError } from "graphql";
import { getUserDetails } from "../../../db/services/user.service.js";

export const TestResolver = {
  testError: async () => {
    throw new GraphQLError("You are not authorized to perform this action.", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  },

  testValidation: async (_: any, args: any) => {
    return getUserDetails({
      where: {
        email: args.input.email,
      },
    });
  },

  hello() {
    return "hello world";
  },
  
  helloDate() {
    return new Date();
  },
};
