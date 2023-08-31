import { CommentMutations } from "./mutations/comment.mutation.js";
import { LikeMutations } from "./mutations/like.mutation.js";
import { PostMutations } from "./mutations/post.mutation.js";
import { UserMutations } from "./mutations/user.mutation.js";
import {
  BookResolver,
  BookResolverType,
  GetColorBookFieldsResolver
} from "./queries/book.resolver.js";
import {
  GetCommentByIdResolver,
  GetCommentFieldsResolver
} from "./queries/comment.resolver.js";
import {
  GetLikeByIdResolver,
  GetLikeFieldsResolver
} from "./queries/like.resolver.js";
import {
  GetNodeByIdResolver,
  NodeResolverType
} from "./queries/node.resolver.js";
import { GetPaginationInfoResolver } from "./queries/pagination.resolver.js";
import {
  GetPostByIdResolver,
  GetPostFieldsResolver
} from "./queries/post.resolver.js";
import {
  TestSubQueryFieldResolver
} from "./queries/test.resolver.js";
import {
  GetUserByIdResolver,
  GetUserFieldsResolver
} from "./queries/user.resolver.js";
import CustomScalers from "./scalers/index.scaler.js";
import UserSubscriptionResolvers from "./subscriptions/index.js";

export const Resolvers = {
  Query: {
    ...GetUserByIdResolver,
    ...GetPostByIdResolver,
    ...GetCommentByIdResolver,
    ...GetLikeByIdResolver,
    ...GetNodeByIdResolver,
    ...BookResolver,

    ...GetPaginationInfoResolver,
  },

  Mutation: {
    ...UserMutations,
    ...PostMutations,
    ...CommentMutations,
    ...LikeMutations,
  },

  Subscription: {
    ...UserSubscriptionResolvers,
  },

  ...GetUserFieldsResolver,
  ...GetPostFieldsResolver,
  ...GetCommentFieldsResolver,
  ...GetLikeFieldsResolver,
  ...NodeResolverType,
  ...GetColorBookFieldsResolver,
  ...BookResolverType,

  ...TestSubQueryFieldResolver,

  ...CustomScalers,
};
