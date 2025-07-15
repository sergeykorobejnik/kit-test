export interface CommentDocument {
  id: string;
  author: string;
  body: string;
  created_at: FirebaseFirestore.Timestamp;
  edited_at: FirebaseFirestore.Timestamp;
}

export interface Comment {
  id: string;
  parentId: string;
  author: string;
  body: string;
  createdAt: string;
}

export interface NewComment {
  postId: string;
  author: string;
  body: string;
}

export type Comments = Comment[];
