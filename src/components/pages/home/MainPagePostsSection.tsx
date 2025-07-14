'use client'

import React from 'react';
import {NewPost, Post as PostType} from "@/lib/firebase/types";
import PostsListWrapper from "@/components/pages/home/PostsListWrapper";
import PostsActionsBar from "@/components/pages/home/PostsActionsBar";
import {useAppDispatch} from "@/lib/redux";
import {createPost} from "@/lib/redux/features/posts/postsSlice";
import {useDisclosure} from "@/lib/hooks/util";

interface MainPagePostsListProps {
    posts: PostType[];
}

const MainPagePostsSection: React.FC<MainPagePostsListProps> = ({posts}) => {
    const creationModalControls = useDisclosure();
    const dispatch = useAppDispatch();

    const onPostCreate = (payload: NewPost) => {
        dispatch(createPost(payload))
        creationModalControls.onClose()
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
            <PostsActionsBar onPostCreate={onPostCreate} creationModalControls={creationModalControls}/>
            <PostsListWrapper initialPosts={posts}/>
        </div>
    );
};

export default MainPagePostsSection;