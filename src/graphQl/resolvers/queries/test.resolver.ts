import { GraphQLError } from "graphql";

export const TestResolver = {
  testError: async () => {
    throw new GraphQLError("You are not authorized to perform this action.", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  },
};
