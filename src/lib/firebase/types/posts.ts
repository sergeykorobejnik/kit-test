import {Comment} from "@/lib/firebase/types/comments";

export interface PostDocument {
    id: string;
    title: string;
    author: string;
    body: string;
    created_at: FirebaseFirestore.Timestamp;
    edited_at: FirebaseFirestore.Timestamp;
    user_comments: FirebaseFirestore.DocumentReference[];
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