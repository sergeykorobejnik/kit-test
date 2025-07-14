import {getPosts} from "@/lib/firebase/api";
import MainPagePostsSection from "@/components/pages/home/MainPagePostsSection";
import React from "react";
import ReduxStoreProvider from "@/components/util/ReduxStoreProvider";


export default async function Home() {
    const posts = await getPosts();

    return (
        <div
            className="bg-slate-200 flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
            <div className="w-full">
                <h1 className={'text-3xl font-bold mb-8'}>Posts</h1>
                <ReduxStoreProvider>
                    <MainPagePostsSection posts={posts}/>
                </ReduxStoreProvider>
            </div>
        </div>
    );
}
