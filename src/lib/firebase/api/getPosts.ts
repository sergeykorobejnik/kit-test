'use server'
import 'server-only'


import {fireStore} from "@/lib/firebase/core";
import {Post, PostDocument} from "@/lib/firebase/types/posts";
import {FilterDirection} from "@/lib/firebase/types";

export interface GetPostsOpts {
    filters?: {
        orderBy?: keyof PostDocument;
        direction?: 'asc' | 'desc',
    }
}

const DEFAULT_ORDER_FIELD = 'created_at';
const DEFAULT_ORDER_DIRECTION = FilterDirection.Ascending;

export async function getPosts(opts?: GetPostsOpts) {

    const postsSnapshot = await fireStore
        .collection('posts')
        .orderBy(opts?.filters?.orderBy ?? DEFAULT_ORDER_FIELD, opts?.filters?.direction ?? DEFAULT_ORDER_DIRECTION)
        .get();

    const posts = postsSnapshot.docs.map(async doc => {
        const postDocData = doc.data();
        let userComments: any[] = [];

        if (postDocData.user_comments && postDocData.user_comments.length > 0) {
            const commentsPromises = postDocData.user_comments.map((ref: any) => ref.get());
            const commentsDocs = await Promise.all(commentsPromises);
            userComments = commentsDocs.map(userCommentDoc => {
                const userCommentDocData = userCommentDoc.data();
                return {
                    id: userCommentDoc.id,
                    parentId: doc.id,
                    author: userCommentDocData.author,
                    body: userCommentDocData.body,
                    createdAt: userCommentDocData.created_at.toDate().toDateString(),
                }
            })
        }

        return {
            id: doc.id,
            createdAt: postDocData.created_at.toDate().toDateString(),
            title: postDocData.title,
            body: postDocData.body,
            author: postDocData.author,
            userComments,
        } as Post;
    });

    return await Promise.all(posts);
}