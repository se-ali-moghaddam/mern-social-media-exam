import User from '../../models/user/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { validateMongoDbId } from '../../utils/ValidateMongoDbId.js';

export const getUsers = asyncHandler(async (req, res) => {
    res.json(await User.find({}));
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

        return res.json(accessToken);
    }

    res.status(401);
    throw new Error('User not found !');
});

export const userDelete = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    res.json(await User.findByIdAndDelete({ _id: id }));
});

export const userDetails = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    res.json(await User.findById({ _id: id }));
});

export const userProfile = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    res.json(await User.findById({ _id: id }));
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

export const userUnfollow = asyncHandler(async (req, res) => {
    const unfollowerId = req?.userId;
    const unfollowingId = req?.body?.followingId;

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