import ColorBooksMapper from "./colorBooks.mapper.js";
import CommentMapper from "./comment.mapper.js";
import LikeMapper from "./like.mapper.js";
import PostMapper from "./post.mapper.js";
import TextBooksMapper from "./textBooks.mapper.js";
import UserMapper from "./users.mapper.js";

export const RootMapper = {
  users: UserMapper,
  textbooks: TextBooksMapper,
  posts: PostMapper,
  comments: CommentMapper,
  colorbooks: ColorBooksMapper,
  likes: LikeMapper,
};
