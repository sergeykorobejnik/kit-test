import React from 'react';
import { getPost } from '@/lib/firebase/api';
import { redirect } from 'next/navigation';
import PostDetailsStateWrapper from '@/components/pages/PostDetails/PostDetailsStateWrapper';
import ReduxStoreProvider from '@/components/util/ReduxStoreProvider';

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;

  const post = await getPost({
    id: postId,
  });

  if (post === null) {
    redirect('/404');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center gap-16 bg-slate-200 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="w-full">
        <ReduxStoreProvider>
          <PostDetailsStateWrapper post={post} />
        </ReduxStoreProvider>
      </div>
    </div>
  );
}
