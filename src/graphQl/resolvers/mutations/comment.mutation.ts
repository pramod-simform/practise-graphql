import { ICommentRequest as IComment } from "../../../interfaces/comment.interface.js";
import {
  createComment,
  updateComment,
} from "../../../db/services/comment.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";

export const CommentMutations = {
  createComment: async (_: any, args: IComment) => {
    return getFieldsMappedData("comments", await createComment(args));
  },

  updateComment: async (_: any, args: IComment) => {
    return getFieldsMappedData("comments", await updateComment(args));
  },
};
