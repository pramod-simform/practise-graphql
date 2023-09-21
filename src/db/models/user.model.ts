import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface.js";

export type UserDocument = IUser & Document;

const UserSchema = new Schema<UserDocument>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: false },
    contactDetails: {
      phone_number: {
        type: String,
        require: false,
      },
      country_code: {
        type: String,
        require: false,
      },
    },
  },
  {
    collection: "users",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    _id: false,
  }
);

const UserModel: Model<UserDocument> = model<UserDocument>("User", UserSchema);

export default UserModel;
