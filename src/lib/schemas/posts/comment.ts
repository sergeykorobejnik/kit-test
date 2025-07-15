import * as z from 'zod';

export const NewCommentSchema = z.object({
  body: z.string().min(10).max(2000),
  author: z.string().min(5).max(500),
});
