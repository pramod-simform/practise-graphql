import { Schema, model, connect } from "mongoose";
import { IUser } from "../interfaces/user.interface.js";

const UserSchema = new Schema<IUser>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: false },
}, {
  collection: "users",
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  _id: false
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;