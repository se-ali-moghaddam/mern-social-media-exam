import express from 'express';
import { commentCreate, commentDelete, commentUpdate, getAllComments, getSingleComment } from '../controllers/comment/CommentController.js';
import {verifyToken} from '../middleware/token/TokenVerification.js';

const router = express.Router();

router.get('/api/comments/', verifyToken, getAllComments);
router.get('/api/comments/:id', verifyToken, getSingleComment);
router.post('/api/comments/', verifyToken, commentCreate);
router.put('/api/comments/:id', verifyToken, commentUpdate);
router.delete('/api/comments/:id', verifyToken, commentDelete);

export default router;