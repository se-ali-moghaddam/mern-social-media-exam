import User from '../../models/user/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const getUsers = asyncHandler(async (req, res) => {
    res.json(await User.find({}));
});

export const userRegister = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req?.body;

    if (await User.findOne({ email })) throw new Error('The user already registerred !');

    try {
        await User.create({
            firstName,
            lastName,
            email,
            password
        });

        res.json('User registerred successfully :)');
    } catch (error) {
        res.json(error);
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

        await User.findByIdAndUpdate(userViewModel.userId, {refresh_token: refreshToken});
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24*60*60*1000
        });

        return res.json(accessToken);
    }

    res.status(401);
    throw new Error('User not found !');
});

export const userDelete = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        res.json(await User.findByIdAndDelete({_id: id}));
    } catch (error) {
        res.json(error);
    }
});

export const userDetails = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        res.json(await User.findById({_id: id}));
    } catch (error) {
        res.json(error);
    }
});

export const userProfile = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        res.json(await User.findById({_id: id}));
    } catch (error) {
        res.json(error);
    }
});