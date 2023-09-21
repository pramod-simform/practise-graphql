export interface ICommentRequest {
  id?: string;
  userId: string;
  postId: string;
  note: string;
}