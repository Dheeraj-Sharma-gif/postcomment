import prisma from '../lib/prisma.js';
import { createPostSchema } from '../validations/validators.js';

export async function createPost(req, res) {
  try {
    const parsed = createPostSchema.parse(req.body);
    const post = await prisma.post.create({ data: parsed });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listPosts(req, res) {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json(posts);
}

export async function getPostWithComments(req, res) {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      comments: {
        where: { parentId: null },
        orderBy: { createdAt: 'asc' },
        include: {
          replies: {
            include: {
              replies: {
                include: {
                  replies: true
                }
              }
            }
          }
        }
      }
    }
  });

  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
}
