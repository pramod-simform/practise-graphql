import { v4 as uuidv4 } from "uuid";

import { IPostRequest as IPost } from "../../interfaces/post.interface.js";
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
  heading: title,
  description: content,
}: IPost): Promise<IPost> => {
  const PostObj = new PostModel({
    _id: uuidv4(),
    title,
    content,
    userId,
  });

  return (await PostObj.save()).toObject();
};

export const updatePost = async (updateBody: IPost): Promise<IPost | null> => {
  const { id: _id } = updateBody;

  const Post = await PostModel.findById(_id);
  if (Post) {
    let update = {
      title: updateBody.heading,
      content: updateBody.description,
      userId: updateBody.userId,
    };
    Object.assign(Post, update);

    return (await Post.save()).toObject();
  }
  return null;
};
