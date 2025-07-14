import {Comment} from "@/lib/firebase/types/comments";

export interface PostDocument {
    id: string;
    title: string;
    author: string;
    body: string;
    created_at: string;
    edited_at: string;
    user_comments: Comment[];
}

export interface Post {
    id: string;
    title: string;
    author: string;
    body: string;
    createdAt: string;
    userComments: Comment[];
}

export interface NewPost {
    title: string;
    author: string;
    body: string;
}

export type Posts = Post[]