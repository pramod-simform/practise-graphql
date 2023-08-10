import { CommentMutations } from "./mutations/comment.mutation.js";
import { LikeMutations } from "./mutations/like.mutation.js";
import { PostMutations } from "./mutations/post.mutation.js";
import { UserMutations } from "./mutations/user.mutation.js";
import {
  GetCommentByIdResolver,
  GetCommentFieldsResolver,
} from "./queries/comment.resolver.js";
import {
  GetLikeByIdResolver,
  GetLikeFieldsResolver,
} from "./queries/like.resolver.js";
import {
  GetNodeByIdResolver,
  NodeResolverType,
} from "./queries/node.resolver.js";
import {
  GetPostByIdResolver,
  GetPostFieldsResolver,
} from "./queries/post.resolver.js";
import {
  GetUserByIdResolver,
  GetUserFieldsResolver,
} from "./queries/user.resolver.js";

export const Resolvers = {
  Query: {
    ...GetUserByIdResolver,
    ...GetPostByIdResolver,
    ...GetCommentByIdResolver,
    ...GetLikeByIdResolver,
    ...GetNodeByIdResolver,
  },
  Mutation: {
    ...UserMutations,
    ...PostMutations,
    ...CommentMutations,
    ...LikeMutations,
  },
  ...GetUserFieldsResolver,
  ...GetPostFieldsResolver,
  ...GetCommentFieldsResolver,
  ...GetLikeFieldsResolver,
  ...NodeResolverType,
};
