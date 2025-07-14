'use server'
import 'server-only'


import {fireStore} from "@/lib/firebase/core";
import {Post} from "@/lib/firebase/schemas/posts";

export async function getPosts() {
    const postsSnapshot = await fireStore.collection('posts').get();

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