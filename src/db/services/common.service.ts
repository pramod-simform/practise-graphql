import { Model } from "mongoose";

interface IPaginationInfo {
  model: Model<any>;
  limit: number;
  page: number;
  searchCond?: { [key: string]: any };
}

interface IPaginationInfoResponse {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const getPaginationInfo = async ({
  model,
  limit,
  page,
  searchCond = {},
}: IPaginationInfo): Promise<IPaginationInfoResponse> => {
  const totalRows = await model.find(searchCond).countDocuments();
  const totalPages = Math.ceil(totalRows / limit);

  return {
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};
