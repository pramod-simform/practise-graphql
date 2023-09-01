import { MutationTypeDef } from "../mutations/index.mutation.js";
import { QueryTypeDef } from "../queries/index.query.js";
import { SubscriptionTypeDef } from "../subscriptions/index.subscription.js";
import { BookTypeDef } from "./book/book.schema.js";
import { ColorBookTypeDef } from "./book/colorBook.schema.js";
import { TextBookTypeDef } from "./book/textBook.schema.js";
import { AuthDirectiveTypeDefs } from "./customDirectives/auth.directive.js";
import { dateDirectiveTypeDefs } from "./customDirectives/dateFormat.directive.js";
import { UpperCaseTypeDefs } from "./customDirectives/uppercase.directive.js";
import { UserInputTypeDef } from "./input/testValidation.input.js";
import { NodeTypeDef } from "./node.schema.js";
import { PaginationInfoTypeDef } from "./pagination/pagination.schema.js";
import { CommentTypeDef } from "./post/comment.schema.js";
import { LikeTypeDef } from "./post/like.schema.js";
import { PostTypeDef } from "./post/post.schema.js";
import { ScalerIncludesTypeDefs } from "./scalerIncludes.schema.js";
import { TestTypeDef } from "./test/test.schema.js";
import { UserTypeDef } from "./user/user.schema.js";

const TypeDefs = [
  UserInputTypeDef,
  
  UpperCaseTypeDefs,
  dateDirectiveTypeDefs,
  AuthDirectiveTypeDefs,

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
  PaginationInfoTypeDef,

  TestTypeDef,
];

export default TypeDefs;
