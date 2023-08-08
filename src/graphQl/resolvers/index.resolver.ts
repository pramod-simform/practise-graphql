import { GetUserByIdResolver } from "./queries/user.resolver.js";

export const Resolvers = {
  Query: {
    ...GetUserByIdResolver
  }
}