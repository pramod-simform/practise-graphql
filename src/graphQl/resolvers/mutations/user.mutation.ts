import { IUserRequest as IUser } from "../../../interfaces/user.interface.js";
import { createUser, updateUser } from "../../../db/services/user.service.js";
import { PubSub } from "graphql-subscriptions";
import pubsub from "../../../utils/pubSub.utils.js";

export const UserMutations = {
  createUser: async (
    _: any,
    args: IUser
  ) => {
    pubsub.publish("USER_CREATED", { createUser: args });
    return await createUser(args);
  },

  updateUser: async (_: any, args: IUser) => {
    return await updateUser(args);
  },
};
