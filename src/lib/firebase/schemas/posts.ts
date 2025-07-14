import {Comment} from "@/lib/firebase/schemas/comments";

export interface Post {
    id: string;
    title: string;
    author: string;
    body: string;
    createdAt: string;
    userComments: Comment[];
}

export type Posts = Post[]