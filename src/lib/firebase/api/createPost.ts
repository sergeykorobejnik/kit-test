'use server';
import 'server-only';
import { fireStore } from '@/lib/firebase/core';
import { NewPost } from '@/lib/firebase/types';
import { firestore } from 'firebase-admin';
import FieldValue = firestore.FieldValue;

export async function createPost(payload: NewPost) {
  await fireStore.collection('posts').add({
    ...payload,
    created_at: FieldValue.serverTimestamp(),
    edited_at: FieldValue.serverTimestamp(),
  });
}
