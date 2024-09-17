import User from '../../models/user/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import fs from 'fs';
import { validateMongoDbId } from '../../utils/ValidateMongoDbId.js';
import { transporter } from '../../utils/EmailTransporter.js';
import { cloudinaryUploadImage } from '../../utils/Cloudinary.js';
import Post from '../../models/post/Post.js';
import Comment from '../../models/comment/Comment.js';

export const getUsers = asyncHandler(async (req, res) => {
    res.json(await User.find({}));
});

export const getTopUsers = asyncHandler(async (req, res) => {
    res.json(await User.find({}).sort("-followers").limit(10));
});

export const userRegister = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req?.body;

    if (await User.findOne({ email })) throw new Error('The user already registerred !');
    await User.create({
        firstName,
        lastName,
        email,
        password
    });

    res.json('User registerred successfully :)');
});

export const checkEmailExistance = asyncHandler(async (req, res) => {
    const { email } = req?.params;

    if (await User.findOne({ email })) {
        res.json(true);
    } else {
        res.json(false);
    }
});

export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req?.body;
    const userFound = await User.findOne({ email });

    if (userFound && await userFound.isPasswordMatched(password)) {
        const userViewModel = {
            userId: userFound._id,
            firstname: userFound.firstName,
            lastName: userFound.lastName,
            userEmail: userFound.email,
            profilePhoto: userFound.profilePhoto,
            admin: userFound.isAdmin,
            isAccountVerified: userFound.isAccountVerified
        }

        const accessToken = jwt.sign(userViewModel, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15s"
        });
        const refreshToken = jwt.sign(userViewModel, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });

        await User.findByIdAndUpdate(userViewModel.userId, { refresh_token: refreshToken });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.json({
            userViewModel,
            accessToken
        });
    }

    res.status(401);
    throw new Error('User not found !');
});

export const userLogout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.json('Token was not detected !');

    const user = await User.findOne({ refresh_token: refreshToken });
    if (!user) return res.json('User not found !');

    user.refresh_token = undefined;
    await user.save();

    res.clearCookie('refreshToken');
    res.json('User was successfully loged out !');
});

export const userDelete = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    await Comment.deleteMany({ user: id });
    await Post.deleteMany({ user: id });
    await User.findByIdAndDelete({ _id: id });

    res.clearCookie('refreshToken');
    res.json('Your account was successfully deleted !');
});

export const userDetails = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    res.json(await User.findById(id));
});

export const userProfile = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    const profile = await User.findById(id)
        .populate('posts')
        .populate('viewdBy')
        .populate('following')
        .populate('followers');

    const viewer = req?.userId;

    if (!profile.viewdBy.find(user => {
        return user._id.toString() === viewer.toString();
    })) {
        await User.findByIdAndUpdate(id, {
            $push: { viewdBy: viewer }
        });
    }

    res.json(profile);
});

export const userUpdate = asyncHandler(async (req, res) => {
    const id = req.userId;

    const user = await User.findByIdAndUpdate(id, {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        bio: req?.body?.bio
    }, {
        new: true
    })

    res.json(user);
});

export const userPasswordUpdate = asyncHandler(async (req, res) => {
    const id = req?.userId;
    const password = req?.body?.password;
    const user = await User.findById(id);

    if (password) {
        user.password = password;
        await user.save();
        res.json('Password changed !');
    }
});

export const userFollow = asyncHandler(async (req, res) => {
    const followerId = req?.userId;
    const followingId = req?.body?.followingId;
    const followingUser = await User.findById(followingId);

    const isFollowed = followingUser.followers.find((user) =>
        user.toString() === followerId.toString()
    );

    if (isFollowed) throw new Error("You already followed this user !");

    await User.findByIdAndUpdate(followingId, {
        $push: { followers: followerId },
        isFollowing: true
    }, {
        new: true
    });

    await User.findByIdAndUpdate(followerId, {
        $push: { following: followingId }
    }, {
        new: true
    });

    res.json('User followed :)');
});

export const checkIsFollowed = asyncHandler(async (req, res) => {
    const followerId = req?.userId;
    const { followingId } = req?.params;
    const followingUser = await User.findById(followingId);

    const isFollowed = followingUser?.followers?.find((user) =>
        user.toString() === followerId.toString()
    );

    if (isFollowed) return res.json(true);

    return res.json(false);
});

export const userUnfollow = asyncHandler(async (req, res) => {
    const unfollowerId = req?.userId;
    const unfollowingId = req?.body?.unfollowingId;

    await User.findByIdAndUpdate(unfollowingId, {
        $pull: { followers: unfollowerId },
        isFollowing: false
    }, {
        new: true
    });

    await User.findByIdAndUpdate(unfollowerId, {
        $pull: { following: unfollowingId }
    }, {
        new: true
    });

    res.json('User unfollowed :(');
});

export const userBlock = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    const user = await User.findByIdAndUpdate(id, {
        isBlocked: true
    }, {
        new: true
    });

    res.json(user);
});

export const userUnblock = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    const user = await User.findByIdAndUpdate(id, {
        isBlocked: false
    }, {
        new: true
    });

    res.json(user);
});

export const userSendEmailMsg = asyncHandler(async (req, res) => {
    const { from, to, subject, message } = req?.body;
    const details = {
        from,
        to,
        subject,
        text: message
    }

    await transporter.sendMail(details);
    res.json('Email was sent successfully !');
});

export const userSendEmailVerification = asyncHandler(async (req, res) => {
    const user = await User.findById(req?.userId);

    const verificationToken = await user.createAccountVerificationToken();
    await user.save();

    const verificationMsg = `To verify your email, please click <a href='http://localhost:3000/verify-account/${verificationToken}'>here</a>`;

    const details = {
        from: process.env.SYSTEM_EMAIL_ADDR,
        to: user.email,
        subject: 'Email Verification',
        html: verificationMsg
    }

    await transporter.sendMail(details, err => {
        if (err) return res.json(err);

        res.json(`An email was sent to ${user.email} , please check your email to verify your account !`);
    });

    res.json('Verification email was sent successfully !');
});

export const userAcconutVerification = asyncHandler(async (req, res) => {
    const { token } = req?.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        accountVerificationToken: hashedToken,
        accountVerificationTokenExpires: { $gt: new Date() }
    });

    if (!user) throw new Error("The verification token was expires !");

    user.isAccountVerified = true;
    user.accountVerificationToken = undefined;
    user.accountVerificationTokenExpires = undefined;
    await user.save();

    res.json('Your account verfied successfully !');
});

export const userForgetPassword = asyncHandler(async (req, res) => {
    const { email } = req?.body;
    const user = await User.findOne({ email });

    if (!user) throw new Error('User not found :(');

    const resetToken = await user.createResetPasswordToken();
    await user.save();

    const resetMsg = `To reset your password, please click <a href='http://localhost:3000/reset-password/${resetToken}'>here</a>`;

    const details = {
        from: process.env.SYSTEM_EMAIL_ADDR,
        to: email,
        subject: 'Reset Password',
        html: resetMsg
    }

    await transporter.sendMail(details, err => {
        if (err) return res.json(err);

        res.json(`An email was sent to ${user.email} , please check your email to reset your password !`);
    });

    res.json('Verification email was sent successfully !');
});

export const userResetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req?.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetTokenExpires: { $gt: new Date() }
    });

    if (!user) throw new Error('User not found :(');

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();

    res.json('Password was changed successfully :)');
});

export const userUploadProfilePhoto = asyncHandler(async (req, res) => {
    const imageLocalPath = `public/images/userProfiles/${req.file.filename}`
    const uploadedImage = await cloudinaryUploadImage(imageLocalPath);
    fs.unlinkSync(imageLocalPath);

    await User.findByIdAndUpdate(req.userId, {
        profilePhoto: uploadedImage.url
    });

    res.json('Profile was uploaded successfully :)');
});