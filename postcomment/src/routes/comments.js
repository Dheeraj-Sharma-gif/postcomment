import { Router } from 'express';
import { addComment, listComments } from '../controllers/commentsController.js';

const router = Router({ mergeParams: true });

router.post('/', addComment);
router.get('/', listComments);

export default router;
