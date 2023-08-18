import { Document, Model, model, Schema } from "mongoose";
import { ILog } from "../interfaces/logs.interface.js";

export type LogDocument = ILog & Document;

const LogSchema = new Schema<LogDocument>(
  {
    _id: { type: String, required: true },
    startTime: { type: Number, require: false },
    endTime: { type: Number, require: false },
    responseTime: { type: Number, require: false },
    operation: { type: String, require: false },
    variables: { type: Object, require: false },
    response: { type: Object, require: false },
    headers: { type: Object, require: false },
    errorCode: { type: String, require: false },
    errorMessage: { type: String, require: false },
    query: { type: String, require: false },
  },
  {
    collection: "logs",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    _id: false,
  }
);

const LogModel: Model<LogDocument> = model<LogDocument>("Log", LogSchema);

export default LogModel;
