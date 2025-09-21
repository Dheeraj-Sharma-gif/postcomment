import prisma from '../lib/prisma.js';
import { createCommentSchema } from '../validations/validators.js';
import sanitizeHtml from 'sanitize-html';

export async function addComment(req, res) {
  try {
    const { postId } = req.params;
    const parsed = createCommentSchema.parse(req.body);

    const sanitized = sanitizeHtml(parsed.content, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a'],
      allowedAttributes: { a: ['href', 'target', 'rel'] }
    });

    const comment = await prisma.comment.create({
      data: {
        postId,
        parentId: parsed.parentId || null,
        content: sanitized,
        author: parsed.author || null
      }
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listComments(req, res) {
  const { postId } = req.params;
  const comments = await prisma.comment.findMany({
    where: { postId, parentId: null },
    include: {
      replies: {
        include: {
          replies: true
        }
      }
    },
    orderBy: { createdAt: 'asc' }
  });
  res.json(comments);
}
