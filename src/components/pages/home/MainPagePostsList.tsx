import React from 'react';
import {Post as PostType} from "@/lib/firebase/schemas";
import ReduxStoreProvider from "@/components/util/ReduxStoreProvider";
import PostsListWrapper from "@/components/pages/home/PostsListWrapper";
import PostsActionsBar from "@/components/pages/home/PostsActionsBar";

interface MainPagePostsListProps {
    posts: PostType[];
}

const MainPagePostsList: React.FC<MainPagePostsListProps> = ({posts}) => {
    return (
        <div className="w-full">
            <h1 className={'text-3xl font-bold mb-8'}>Posts</h1>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <ReduxStoreProvider>
                    <PostsActionsBar/>
                    <PostsListWrapper initialPosts={posts}/>
                </ReduxStoreProvider>
            </div>
        </div>
    );
};

export default MainPagePostsList;