import express from 'express';
import { categoryCreate, categoryDelete, categoryUpdate, getAllCategories, getSingleCategory } from '../controllers/category/CategoryController.js';
import { verifyToken } from '../middleware/token/TokenVerification.js';

const router = express.Router();

router.get('/api/categories/', verifyToken, getAllCategories);
router.get('/api/categories/:id', verifyToken, getSingleCategory);
router.post('/api/categories/', verifyToken, categoryCreate);
router.put('/api/categories/:id', verifyToken, categoryUpdate);
router.delete('/api/categories/:id', verifyToken, categoryDelete);

export default router;