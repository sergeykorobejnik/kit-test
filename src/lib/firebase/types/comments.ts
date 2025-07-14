export interface Comment {
    id: string;
    parentId: string;
    author: string;
    body: string;
    createdAt: string;
}

export type Comments = Comment[];