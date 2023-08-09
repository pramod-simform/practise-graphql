import { ICommentRequest as IComment } from "../../../interfaces/comment.interface.js";
import { createComment, updateComment } from "../../../db/services/comment.service.js";

export const CommentMutations = {
  createComment: async (_: any, args: IComment) => {
    return await createComment(args);
  },

  updateComment: async (_: any, args: IComment) => {
    return await updateComment(args);
  },
};
