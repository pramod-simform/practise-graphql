import { v4 as uuidv4 } from "uuid";

import { ICommentRequest as IComment } from "../../interfaces/comment.interface.js";
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
  note: content,
}: IComment): Promise<IComment> => {
  const CommentObj = new CommentModel({
    _id: uuidv4(),
    userId,
    postId,
    note: content,
  });

  return (await CommentObj.save()).toObject();
};

export const updateComment = async (
  updateBody: IComment
): Promise<IComment | null> => {
  const { id: _id } = updateBody;

  const Comment = await CommentModel.findById(_id);
  if (Comment) {
    const update = {
      content: updateBody.note,
    };
    Object.assign(Comment, update);

    return (await Comment.save()).toObject();
  }
  return null;
};
