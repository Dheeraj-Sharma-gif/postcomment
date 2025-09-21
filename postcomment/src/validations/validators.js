import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  author: z.string().optional()
});

export const createCommentSchema = z.object({
  content: z.string().min(1),
  author: z.string().optional(),
  parentId: z.string().optional().nullable()
});
