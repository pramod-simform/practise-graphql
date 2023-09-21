import { IUserRequest } from "../../../interfaces/user.interface.js";
import { getUserDetails } from "../../../db/services/user.service.js";
import { IPostRequest } from "../../../interfaces/post.interface.js";
import { getPostDetails } from "../../../db/services/post.service.js";
import { ICommentRequest } from "../../../interfaces/comment.interface.js";
import { getCommentDetails } from "../../../db/services/comment.service.js";
import { ILikeRequest } from "../../../interfaces/like.interface.js";
import { getLikeDetails } from "../../../db/services/like.service.js";
import { getFieldsMappedData } from "../../../utils/helper.js";

export const GetNodeByIdResolver = {
  getNodeById: async (_: any, args: any) => {
    const id: string = args.id!;

    const WhereCond = { where: { _id: id } };

    let data: unknown = null;
    let type: unknown = null;
    const User: IUserRequest | null = getFieldsMappedData(
      "users",
      await getUserDetails(WhereCond)
    );
    if (User) {
      data = User;
      type = "User";
    }

    const Post: IPostRequest | null = getFieldsMappedData(
      "posts",
      await getPostDetails(WhereCond)
    );
    if (Post) {
      data = Post;
      type = "Post";
    }

    const Comment: ICommentRequest | null = getFieldsMappedData(
      "comments",
      await getCommentDetails(WhereCond)
    );
    if (Comment) {
      data = Comment;
      type = "Comment";
    }

    const Like: ILikeRequest | null = getFieldsMappedData(
      "likes",
      await getLikeDetails(WhereCond)
    );
    if (Like) {
      data = Like;
      type = "Like";
    }

    if (data) {
      return { ...data, type };
    }
    return null;
  },
};

export const NodeResolverType = {
  Node: {
    __resolveType(obj: any) {
      return obj.type || null;
    },
  },
};
