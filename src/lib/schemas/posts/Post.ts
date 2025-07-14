import * as z from "zod";

export const NewPostSchema = z.object({
    title: z.string().min(5).max(500),
    body: z.string().min(50).max(2000),
    author: z.string().min(5).max(500),
})