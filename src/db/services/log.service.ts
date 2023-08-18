import { v4 as uuidv4 } from "uuid";
import { ILog } from "../../interfaces/logs.interface.js";
import LogModel from "../models/log.model.js";

interface IFetchLog {
  where: any;
}

interface IUpdateLog extends IFetchLog {
  where: any;
  updateBody: ILog;
}

export const createLog = async ({
  _id = uuidv4(),
  startTime,
  endTime,
  responseTime,
  operation,
  variables,
  response,
  headers,
  query,
}: ILog): Promise<ILog> => {
  const LogObj = new LogModel({
    _id,
    startTime,
    endTime,
    responseTime,
    operation,
    variables,
    response,
    headers,
    query,
  });

  return LogObj.save();
};

export const fetchLog = async ({ where }: IFetchLog): Promise<ILog | null> => {
  return LogModel.findOne(where);
};

export const updateLog = async ({
  where,
  updateBody,
}: IUpdateLog): Promise<ILog | null> => {
  return LogModel.findOneAndUpdate(where, updateBody, {
    new: true,
  });
};
