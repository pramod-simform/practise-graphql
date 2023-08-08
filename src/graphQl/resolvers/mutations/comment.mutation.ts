import { IComment } from "../../../db/interfaces/comment.interface.js";
import { createComment } from "../../../db/services/comment.service.js";

export const CreateCommentMutation = {
  createComment: async (_: any, args: IComment) => {
    return await createComment(args);
  },
};
