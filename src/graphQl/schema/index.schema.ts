import { MutationTypeDef } from "../mutations/index.mutation.js";
import { QueryTypeDef } from "../queries/index.query.js";
import { SubscriptionTypeDef } from "../subscriptions/index.subscription.js";
import { BookTypeDef } from "./book/book.schema.js";
import { ColorBookTypeDef } from "./book/colorBook.schema.js";
import { TextBookTypeDef } from "./book/textBook.schema.js";
import { NodeTypeDef } from "./node.schema.js";
import { CommentTypeDef } from "./post/comment.schema.js";
import { LikeTypeDef } from "./post/like.schema.js";
import { PostTypeDef } from "./post/post.schema.js";
import { ScalerIncludesTypeDefs } from "./scalerIncludes.schema.js";
import { UserTypeDef } from "./user/user.schema.js";

const TypeDefs = [
  ScalerIncludesTypeDefs,
  QueryTypeDef,
  MutationTypeDef,
  NodeTypeDef,
  UserTypeDef,
  PostTypeDef,
  CommentTypeDef,
  LikeTypeDef,
  SubscriptionTypeDef,
  BookTypeDef,
  ColorBookTypeDef,
  TextBookTypeDef,
];

export default TypeDefs;
