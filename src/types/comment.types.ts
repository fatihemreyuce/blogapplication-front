export type CommentStatus =
  | "approved"
  | "pending"
  | "rejected"
  | "spam"
  | string;

/** `comments` tablosu — Supabase şeması */
export type Comment = {
  id: string;
  post_id: string;
  author_id: string | null;
  content: string;
  status: CommentStatus;
  parent_id: string | null;
  created_at: string | null;
  updated_at: string | null;
};

/** Liste / UI için yazar bilgisi eklenmiş satır */
export type CommentWithAuthor = Comment & {
  author_name: string | null;
  author_avatar_url: string | null;
};

export type CreateCommentInput = {
  post_id: string;
  content: string;
  parent_id?: string | null;
  /** Varsayılan: pending (moderasyon) */
  status?: CommentStatus;
};

export type CommentTreeNode = CommentWithAuthor & {
  replies: CommentTreeNode[];
};
