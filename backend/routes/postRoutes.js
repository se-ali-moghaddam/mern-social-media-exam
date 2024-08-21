import express from 'express';
import { getAllPosts, getSinglePost, postCreate, postDelete, postToggleDislike, postToggleLike, postUpdate } from '../controllers/post/PostController.js';
import { verifyToken } from '../middleware/token/TokenVerification.js';
import { photoUpload, postImageResize } from '../middleware/upload/photoUpload.js';

const router = express.Router();

router.get('/api/posts/', verifyToken, getAllPosts);
router.get('/api/posts/:id', verifyToken, getSinglePost);
router.post('/api/posts/', verifyToken, photoUpload.single("image"), postImageResize, postCreate);
router.put('/api/posts/like/:id', verifyToken, postToggleLike);
router.put('/api/posts/dislike/:id', verifyToken, postToggleDislike);
router.put('/api/posts/:id', verifyToken, postUpdate);
router.delete('/api/posts/:id', verifyToken, postDelete);

export default router;