'use server';
import 'server-only';
import { fireStore } from '@/lib/firebase/core';
import { NewComment } from '@/lib/firebase/types';
import { firestore } from 'firebase-admin';
import FieldValue = firestore.FieldValue;

interface CreateCommentPayload {
  value: NewComment;
}

export async function createComment({ value }: CreateCommentPayload) {
  const commentRef = await fireStore.collection('comments').add({
    author: value.author,
    body: value.body,
    created_at: FieldValue.serverTimestamp(),
    edited_at: FieldValue.serverTimestamp(),
  });

  const postDoc = fireStore.collection('posts').doc(value.postId);
  await postDoc.update({
    user_comments: FieldValue.arrayUnion(commentRef),
  });
}
