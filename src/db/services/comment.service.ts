import { v4 as uuidv4 } from "uuid";

import { IComment } from "../interfaces/comment.interface.js";
import CommentModel from "../models/comment.model.js";

export const getCommentDetails = async ({ where }: { where: any }) => {
  const Comment: IComment | null = await CommentModel.findOne(where).lean();
  if (Comment) {
    return Comment;
  }
  return null;
};

export const getComments = async ({ where }: { where: any }) => {
  const Comments: [IComment] = await CommentModel.find(where).lean();
  return Comments;
};

export const createComment = async ({
  userId,
  postId,
  content,
}: IComment): Promise<IComment> => {
  const CommentObj = new CommentModel({
    _id: uuidv4(),
    userId,
    postId,
    content,
  });

  return CommentObj.save();
};

export const updateComment = async (
  updateBody: IComment
): Promise<IComment | null> => {
  const { _id } = updateBody;

  const Comment = await CommentModel.findById(_id);
  if (Comment) {
    Object.assign(Comment, updateBody);

    return Comment.save();
  }
  return null;
};
