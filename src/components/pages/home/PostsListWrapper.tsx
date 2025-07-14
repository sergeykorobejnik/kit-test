'use client';
import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/redux';
import { updatePosts } from '@/lib/redux/features/posts/postsSlice';
import { Post } from '@/components/ui/Post';
import { Posts } from '@/lib/firebase/types';

interface PostsListWrapperProps {
  initialPosts: Posts;
}

const PostsListWrapper: React.FC<PostsListWrapperProps> = ({ initialPosts }) => {
  const store = useAppStore();
  const dispatch = useAppDispatch();

  const initialized = useRef(false);

  if (!initialized.current) {
    store.dispatch(updatePosts(initialPosts));
    initialized.current = true;
  }

  const { posts, loading } = useAppSelector((state) => state.posts);

  if (loading) {
    return (
      <div className="pt-6 pb-6">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <Post.Container key={post.id}>
          <Post.Header
            href={`/posts/${post.id}`}
            title={Post.util.postContentFormater(post.title, {
              maxLength: Post.constants.MAX_TITLE_LENGTH.Default,
            })}
            author={post.author}
            createdAt={post.createdAt}
          />
          <Post.Body>
            {Post.util.postContentFormater(post.body, {
              maxLength: Post.constants.MAX_POST_LENGTH.Default,
            })}
          </Post.Body>
          <Post.CommentCounter count={post.userComments.length} />
        </Post.Container>
      ))}
    </>
  );
};

export default PostsListWrapper;
