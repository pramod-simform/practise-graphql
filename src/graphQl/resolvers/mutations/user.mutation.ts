import { IUserRequest as IUser } from "../../../interfaces/user.interface.js";
import { createUser, updateUser } from "../../../db/services/user.service.js";

export const UserMutations = {
  createUser: async (_: any, args: IUser) => {
    return await createUser(args);
  },

  updateUser: async (_: any, args: IUser) => {
    return await updateUser(args);
  },
};
