import { Router } from 'express';
import { createPost, listPosts, getPostWithComments } from '../controllers/postsController.js';

const router = Router();

router.post('/', createPost);
router.get('/', listPosts);
router.get('/:postId', getPostWithComments);

export default router;
