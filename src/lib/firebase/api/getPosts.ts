'use server';
import 'server-only';

import { fireStore } from '@/lib/firebase/core';
import { PostDocument } from '@/lib/firebase/types/posts';
import { FilterDirection } from '@/lib/firebase/types';
import { commentsListTransformer, postTransformer } from '@/lib/firebase/transfromers';

export interface GetPostsOpts {
  filters?: {
    orderBy?: keyof PostDocument;
    direction?: 'asc' | 'desc';
  };
}

const DEFAULT_ORDER_FIELD = 'created_at';
const DEFAULT_ORDER_DIRECTION = FilterDirection.Ascending;

export async function getPosts(opts?: GetPostsOpts) {
  const postsSnapshot = await fireStore
    .collection('posts')
    .orderBy(
      opts?.filters?.orderBy ?? DEFAULT_ORDER_FIELD,
      opts?.filters?.direction ?? DEFAULT_ORDER_DIRECTION,
    )
    .get();

  const posts = postsSnapshot.docs.map(async (doc) => {
    const postDocData = doc.data();

    const userComments = await commentsListTransformer(doc.id, postDocData.user_comments);

    return postTransformer(doc.id, postDocData, userComments);
  });

  return await Promise.all(posts);
}
