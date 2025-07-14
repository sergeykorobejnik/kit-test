import { commentTransformer } from '@/lib/firebase/transfromers/commentTransformer';
import { firestore } from 'firebase-admin';
import { Comment } from '@/lib/firebase/types';
import DocumentReference = firestore.DocumentData;

export const commentsListTransformer = async (
  parentId: string,
  commentReferences: DocumentReference[],
) => {
  let userComments: Comment[] = [];

  if (commentReferences && commentReferences.length > 0) {
    const commentsPromises = commentReferences.map((ref: DocumentReference) => ref.get());
    const commentsDocs = await Promise.all(commentsPromises);
    userComments = commentsDocs.map((userCommentDoc) => {
      const userCommentDocData = userCommentDoc.data();
      return commentTransformer(userCommentDoc.id, parentId, userCommentDocData);
    });
  }

  return userComments;
};
