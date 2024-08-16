import express from "express";
import { getUsers, userBlock, userDelete, userDetails, userFollow, userLogin, userPasswordUpdate, userProfile, userRegister, userUnblock, userUnfollow, userUpdate } from "../controllers/user/UserController.js";
import { verifyToken } from "../middleware/token/TokenVerification.js";
import { refreshToken } from "../controllers/refreshToken/RefreshTokenController.js";

const router = express.Router();

router.get('/token', refreshToken);

router.get('/api/users/', verifyToken, getUsers);
router.get('/api/users/:id', verifyToken, userDetails);
router.get('/api/users/profile/:id', verifyToken, userProfile);

router.post('/api/users/register', userRegister);
router.post('/api/users/login', userLogin);

router.put('/api/users/', verifyToken, userUpdate);
router.put('/api/users/password/', verifyToken, userPasswordUpdate);
router.put('/api/users/follow/', verifyToken, userFollow);
router.put('/api/users/unfollow/', verifyToken, userUnfollow);
router.put('/api/users/block/:id', userBlock);
router.put('/api/users/unblock/:id', userUnblock);

router.delete('/api/users/:id', verifyToken, userDelete);

export default router;