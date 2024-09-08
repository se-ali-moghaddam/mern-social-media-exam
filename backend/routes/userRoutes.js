import express from "express";
import { getTopUsers, getUsers, userAcconutVerification, userBlock, userDelete, userDetails, userFollow, userForgetPassword, userLogin, userLogout, userPasswordUpdate, userProfile, userRegister, userResetPassword, userSendEmailMsg, userSendEmailVerification, userUnblock, userUnfollow, userUpdate, userUploadProfilePhoto } from "../controllers/user/UserController.js";
import { verifyToken } from "../middleware/token/TokenVerification.js";
import { profileImageResize, photoUpload } from "../middleware/upload/photoUpload.js";
import { refreshToken } from "../controllers/refreshToken/RefreshTokenController.js";

const router = express.Router();

router.get('/api/token', refreshToken);

router.get('/api/users/', verifyToken, getUsers);
router.get('/api/top-users/', verifyToken, getTopUsers);
router.get('/api/users/:id/', verifyToken, userDetails);
router.get('/api/users/profile/:id/', verifyToken, userProfile);

router.post('/api/users/register/', userRegister);
router.post('/api/users/login/', userLogin);
router.post('/api/users/email/', verifyToken, userSendEmailMsg);
router.post('/api/users/email-verification/', verifyToken, userSendEmailVerification);

router.put('/api/users/', verifyToken, userUpdate);
router.put('/api/users/password/', verifyToken, userPasswordUpdate);
router.put('/api/users/follow/', verifyToken, userFollow);
router.put('/api/users/unfollow/', verifyToken, userUnfollow);
router.put('/api/users/block/:id/', verifyToken, userBlock);
router.put('/api/users/unblock/:id/', verifyToken, userUnblock);
router.put('/api/users/verify-account/', verifyToken, userAcconutVerification);
router.put('/api/users/forget-password/', userForgetPassword);
router.put('/api/users/reset-password/', userResetPassword);
router.put('/api/users/upload-profile-photo/', verifyToken, photoUpload.single('image'), profileImageResize, userUploadProfilePhoto);

router.delete('/api/users/logout/', userLogout);
router.delete('/api/users/:id/', verifyToken, userDelete);

export default router;