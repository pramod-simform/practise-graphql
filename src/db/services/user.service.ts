import { v4 as uuidv4 } from "uuid";

import { IUserRequest as IUser } from "../../interfaces/user.interface.js";
import UserModel from "../models/user.model.js";


type getUserDetails = {
  where: any;
};

export const getUserDetails = async ({ where }: getUserDetails) => {
  const User: IUser | null = await UserModel.findOne(where).lean();
  if (User) {
    return User;
  }
  return null;
};

export const createUser = async ({
  name,
  email,
  age,
  location,
}: IUser): Promise<IUser> => {
  const UserObj = new UserModel({
    _id: uuidv4(),
    name,
    email,
    age,
    location,
  });

  return UserObj.save();
};

export const updateUser = async (updateBody: IUser): Promise<IUser | null> => {
  const { _id } = updateBody;

  const User = await UserModel.findById(_id);
  if (User) {
    Object.assign(User, updateBody);

    return User.save();
  }
  return null;
};
