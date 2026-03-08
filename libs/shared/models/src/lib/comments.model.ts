export interface Comment {
  id: string;
  productId: string;
  userId: string;
  timestamp: string; // ISO date string
  text?: string; // Only for comments
}

export interface CommentResponse {
  commentId: string;
  comments: Comment[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
