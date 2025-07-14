import { Comment, Post } from '@/lib/firebase/types';
import { firestore } from 'firebase-admin';
import DocumentData = firestore.DocumentData;

export const postTransformer = (
  id: string,
  postDocument: DocumentData | undefined,
  userComments: Comment[],
): Post => {
  return {
    id,
    createdAt: postDocument?.created_at.toDate().toDateString(),
    title: postDocument?.title,
    body: postDocument?.body,
    author: postDocument?.author,
    userComments,
  };
};
