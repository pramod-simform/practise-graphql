import { v4 as uuidv4 } from "uuid";
import { getSortOrder } from "../../graphQl/resolvers/queries/utils.resolver.js";

import { IUserRequest as IUser } from "../../interfaces/user.interface.js";
import UserModel from "../models/user.model.js";

type GetUserDetails = {
  where: any;
  limit?: number;
  page?: number;
  sortByOrder?: string;
  sortByField?: string;
  selectedFields?: { [x: string]: number };
};

export const getUsers = async ({
  where,
  limit = 0,
  page = 0,
  sortByOrder = "asc",
  sortByField = "name",
  selectedFields = {},
}: GetUserDetails) => {
  const offset = (page - 1) * limit;

  const formattedSortBy = getSortOrder({
    sortByOrder: sortByOrder || "asc",
    sortByField: sortByField || "name",
    isString: 1,
  });
  const sortCriteria = `${formattedSortBy.sortByOrder}`;
  if (limit > 0) {
    return await UserModel.find(where)
      .sort(sortCriteria)
      .skip(offset)
      .limit(limit)
      .select(selectedFields)
      .lean();
  }
  return await UserModel.find(where)
    .sort(sortCriteria)
    .select(selectedFields)
    .lean();
};

export const getUserDetails = async ({
  where,
  selectedFields = {},
}: GetUserDetails) => {
  const User: IUser | null = await UserModel.findOne(where)
    .select(selectedFields)
    .lean();
  if (User) {
    return User;
  }
  return null;
};

export const createUser = async ({
  fullName: name,
  username: email,
  ageGroup: age,
  address: location,
  contactInfo: contactDetails,
}: IUser): Promise<IUser> => {
  const UserObj = new UserModel({
    _id: uuidv4(),
    name,
    email,
    age,
    location,
    ...(contactDetails ? { contactDetails } : {}),
  });

  return (await UserObj.save()).toObject();
};

export const updateUser = async (updateBody: IUser): Promise<IUser | null> => {
  const { id: _id } = updateBody;

  const User = await UserModel.findById(_id);
  if (User) {
    const update = {
      name: updateBody.fullName,
      email: updateBody.username,
      age: updateBody.ageGroup,
      location: updateBody.address,
      ...(updateBody.contactInfo
        ? {
            contactDetails: {
              phone_number: updateBody.contactInfo?.tel,
              country_code: updateBody.contactInfo?.isoCode,
            },
          }
        : {}),
    };
    Object.assign(User, update);

    return (await User.save()).toObject();
  }
  return null;
};
