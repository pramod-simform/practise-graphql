export interface ICommentRequest {
  _id?: string;
  userId: string;
  postId: string;
  content: string;
}