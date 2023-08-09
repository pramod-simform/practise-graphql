import { ICommentRequest as IComment } from "../../../interfaces/comment.interface.js";
import { createComment } from "../../../db/services/comment.service.js";

export const CreateCommentMutation = {
  createComment: async (_: any, args: IComment) => {
    return await createComment(args);
  },
};
