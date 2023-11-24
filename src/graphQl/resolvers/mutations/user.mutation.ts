import { IUserRequest as IUser } from "../../../interfaces/user.interface.js";
import { createUser, updateUser } from "../../../db/services/user.service.js";
import { PubSub } from "graphql-subscriptions";
import pubsub from "../../../utils/pubSub.utils.js";
import { getFieldsMappedData } from "../../../utils/helper.js";

export const UserMutations = {
  createUser: async (_: any, args: IUser) => {
    let data =  getFieldsMappedData("users", await createUser(args));
    pubsub.publish("USER_CREATED", { createUser: data });
    return data;
  },

  updateUser: async (_: any, args: IUser) => {
    return getFieldsMappedData("users", await updateUser(args));
  },
};
