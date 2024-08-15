import express from "express";
import { getUsers, userDelete, userDetails, userLogin, userProfile, userRegister } from "../controllers/user/UserController.js";
import { verifyToken } from "../middleware/token/TokenVerification.js";
import { refreshToken } from "../controllers/refreshToken/RefreshTokenController.js";

const router = express.Router();

router.get('/token', refreshToken);

router.get('/api/users/', verifyToken, getUsers);
router.get('/api/users/:id', verifyToken, userDetails);
router.get('/api/users/profile/:id', verifyToken, userProfile);
router.post('/api/users/register', userRegister);
router.post('/api/users/login', userLogin);
router.delete('/api/users/:id', verifyToken, userDelete);

export default router;