import { getPosts } from '@/lib/firebase/api';
import MainPagePostsSection from '@/components/pages/home/MainPagePostsSection';
import React from 'react';
import ReduxStoreProvider from '@/components/util/ReduxStoreProvider';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center gap-16 bg-slate-200 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="w-full">
        <h1 className={'mb-8 text-3xl font-bold'}>Posts</h1>
        <ReduxStoreProvider>
          <MainPagePostsSection posts={posts} />
        </ReduxStoreProvider>
      </div>
    </div>
  );
}
