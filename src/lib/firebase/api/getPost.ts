'use server';
import 'server-only';
import { fireStore } from '@/lib/firebase/core';
import { commentsListTransformer, postTransformer } from '@/lib/firebase/transfromers';

interface GetPostOpts {
  id: string;
}

export async function getPost(opts: GetPostOpts) {
  const postRef = fireStore.collection('posts').doc(opts.id);

  const postDoc = await postRef.get();

  const postData = postDoc.data();

  if (postData === undefined) {
    return null;
  }

  const userComments = await commentsListTransformer(postDoc.id, postData?.user_comments);

  return postTransformer(postDoc.id, postData, userComments);
}
