import {firestore} from "firebase-admin";
import {Comment} from "@/lib/firebase/types";
import DocumentData = firestore.DocumentData;

export const commentTransformer = (id: string, parentId: string, documentData: DocumentData): Comment => {
    return {
        id,
        parentId,
        author: documentData.author,
        body: documentData.body,
        createdAt: documentData.created_at.toDate().toDateString(),
    }
}