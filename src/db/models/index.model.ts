import { Model, Document } from "mongoose";

import CommentModel, { CommentDocument } from "./comment.model.js";
import UserModel, { UserDocument } from "./user.model.js";
import PostModel, { PostDocument } from "./posts.model.js";
import LikeModel, { LikeDocument } from "./likes.model.js";

export interface ModelMap {
  comments: Model<CommentDocument>;
  users: Model<UserDocument>;
  posts: Model<PostDocument>;
  likes: Model<LikeDocument>;
}

const AllModels: ModelMap = {
  comments: CommentModel,
  users: UserModel,
  posts: PostModel,
  likes: LikeModel,
};

export default AllModels;
