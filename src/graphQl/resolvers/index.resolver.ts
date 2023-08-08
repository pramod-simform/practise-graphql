import { CreateCommentMutation } from "./mutations/comment.mutation.js";
import { CreateLikeMutation } from "./mutations/like.mutation.js";
import { CreatePostMutation } from "./mutations/post.mutation.js";
import { CreateUserMutation } from "./mutations/user.mutation.js";
import {
  GetCommentByIdResolver,
  GetCommentFieldsResolver,
} from "./queries/comment.resolver.js";
import {
  GetLikeByIdResolver,
  GetLikeFieldsResolver,
} from "./queries/like.resolver.js";
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
  },
  Mutation: {
    ...CreateUserMutation,
    ...CreatePostMutation,
    ...CreateCommentMutation,
    ...CreateLikeMutation,
  },
  ...GetUserFieldsResolver,
  ...GetPostFieldsResolver,
  ...GetCommentFieldsResolver,
  ...GetLikeFieldsResolver,
};
