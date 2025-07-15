'use client';

import React, { useMemo, useRef } from 'react';
import { NewComment, Post as PostType } from '@/lib/firebase/types';
import { Post } from '@/components/ui/Post';
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/redux';
import { createComment, updateSelectedPost } from '@/lib/redux/features/posts/postsSlice';
import { Textarea } from '@/components/shadcn/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewCommentSchema } from '@/lib/schemas/posts/comment';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';

interface PostStateWrapperProps {
  post: PostType;
}

type NewCommentFormType = Omit<NewComment, 'postId'> & { postId?: string };

const PostDetailsStateWrapper: React.FC<PostStateWrapperProps> = ({ post }) => {
  const store = useAppStore();
  const dispatch = useAppDispatch();

  const initialized = useRef(false);

  if (!initialized.current) {
    store.dispatch(updateSelectedPost(post));
    initialized.current = true;
  }

  const { selectedPost, loading } = useAppSelector((state) => state.posts);

  const postUpdating = useMemo(() => selectedPost && loading, [selectedPost, loading]);

  const form = useForm<NewCommentFormType>({
    resolver: zodResolver(NewCommentSchema),
    defaultValues: {
      body: '',
      author: '',
    },
  });

  const submitHandler = (payload: NewCommentFormType) => {
    if (!selectedPost) return;
    dispatch(createComment({ postId: selectedPost.id, ...payload }));
  };

  if (!selectedPost && loading) {
    return (
      <div className="flex w-full items-center justify-center pt-20 pb-20">
        <span className={'text-xl'}>Loading...</span>
      </div>
    );
  }

  if (selectedPost === null) {
    return null;
  }

  return (
    <Post.Container key={selectedPost.id}>
      <Post.Header
        href={`/posts/${selectedPost.id}`}
        title={selectedPost.title}
        author={selectedPost.author}
        createdAt={selectedPost.createdAt}
      />
      <Post.Body className="mb-6">{selectedPost.body}</Post.Body>
      <p className={'mb-6 text-lg font-bold'}>Comments</p>
      <Form {...form}>
        <form
          className={'mb-4 flex flex-col gap-4 md:mb-10'}
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Tell us your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leave your comment</FormLabel>
                <FormControl>
                  <Textarea placeholder="And what you bring here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={'flex items-center gap-4'}>
            <Button type={'submit'} disabled={!!postUpdating}>
              Save
            </Button>
            {postUpdating && <span className={'text-neutral-600'}>Saving Changes...</span>}
          </div>
        </form>
      </Form>
      {!selectedPost.userComments?.length && (
        <Post.EmptyComments className="flex items-center gap-4 text-neutral-600">
          Looks like comments section is empty ;(
        </Post.EmptyComments>
      )}
      <div className="flex flex-col gap-4">
        {selectedPost.userComments.map((comment) => {
          return <Post.Comment key={comment.id} {...comment} />;
        })}
      </div>
    </Post.Container>
  );
};

export default PostDetailsStateWrapper;
