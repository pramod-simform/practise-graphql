import { IUser } from "../../../db/interfaces/user.interface.js";
import { createUser } from "../../../db/services/user.service.js";

export const CreateUserMutation = {
  createUser: async (_: any, args: IUser) => {
    return await createUser(args);
  },
};
