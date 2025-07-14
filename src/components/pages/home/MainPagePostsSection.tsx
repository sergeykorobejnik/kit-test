'use client';

import React from 'react';
import { NewPost, Post as PostType } from '@/lib/firebase/types';
import PostsListWrapper from '@/components/pages/home/PostsListWrapper';
import PostsActionsBar from '@/components/pages/home/PostsActionsBar';
import { useAppDispatch } from '@/lib/redux';
import {
  createPost,
  FiltersPayload,
  getPosts,
  updateFilters,
} from '@/lib/redux/features/posts/postsSlice';
import { useDisclosure } from '@/lib/hooks/util';

interface MainPagePostsListProps {
  posts: PostType[];
}

const MainPagePostsSection: React.FC<MainPagePostsListProps> = ({ posts }) => {
  const creationModalControls = useDisclosure();
  const dispatch = useAppDispatch();

  const onPostCreate = (payload: NewPost) => {
    dispatch(createPost(payload));
    creationModalControls.onClose();
  };

  const onFilterChange = (value: FiltersPayload) => {
    dispatch(updateFilters(value));
    dispatch(getPosts());
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <PostsActionsBar
        onPostCreate={onPostCreate}
        creationModalControls={creationModalControls}
        onFilterChange={onFilterChange}
      />
      <PostsListWrapper initialPosts={posts} />
    </div>
  );
};

export default MainPagePostsSection;
