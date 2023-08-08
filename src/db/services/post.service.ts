import { v4 as uuidv4 } from "uuid";

import { IPost } from "../interfaces/post.interface.js";
import PostModel from "../models/posts.model.js";

export const getPostDetails = async ({ where }: { where: any }) => {
  const Post: IPost | null = await PostModel.findOne(where).lean();
  if (Post) {
    return Post;
  }
  return null;
};

export const getPosts = async ({ where }: { where: any }) => {
  const Posts: [IPost] = await PostModel.find(where).lean();
  return Posts;
};

export const createPost = async ({
  userId,
  title,
  content,
}: IPost): Promise<IPost> => {
  const PostObj = new PostModel({
    _id: uuidv4(),
    title,
    content,
    userId,
  });

  return PostObj.save();
};

export const updatePost = async (updateBody: IPost): Promise<IPost | null> => {
  const { _id } = updateBody;

  const Post = await PostModel.findById(_id);
  if (Post) {
    Object.assign(Post, updateBody);

    return Post.save();
  }
  return null;
};
