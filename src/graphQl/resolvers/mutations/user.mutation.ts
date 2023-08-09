import { IUserRequest as IUser } from "../../../interfaces/user.interface.js";
import { createUser } from "../../../db/services/user.service.js";

export const CreateUserMutation = {
  createUser: async (_: any, args: IUser) => {
    return await createUser(args);
  },
};
