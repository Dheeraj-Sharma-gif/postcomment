import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/posts', postsRouter);
app.use('/api/posts/:postId/comments', commentsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
