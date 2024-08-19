import express from 'express';
import { getAllPosts, getSinglePost, postCreate, postUpdate } from '../controllers/post/PostController.js';
import { verifyToken } from '../middleware/token/TokenVerification.js';
import { photoUpload, postImageResize } from '../middleware/upload/photoUpload.js';

const router = express.Router();

router.get('/api/posts/', verifyToken, getAllPosts);
router.get('/api/posts/:id', verifyToken, getSinglePost);
router.post('/api/post/', verifyToken, photoUpload.single("image"), postImageResize, postCreate);
router.put('/api/posts/:id', verifyToken, postUpdate);

export default router;