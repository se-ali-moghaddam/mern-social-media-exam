import asyncHandler from 'express-async-handler';
import Comment from '../../models/comment/Comment.js';
import { validateMongoDbId } from '../../utils/ValidateMongoDbId.js';
import { checkIsBlocked } from "../../utils/UserBlockCheck.js";
import User from '../../models/user/User.js';
import { checkIsVerified } from '../../utils/UserVerificationCheck.js';

export const getAllComments = asyncHandler(async (req, res) => {
    res.json(await Comment.find({}).populate('user'));
});

export const getSingleComment = asyncHandler(async (req, res) => {
    const id = req?.params?.id;
    validateMongoDbId(id);

    res.json(await Comment.findById(id).populate('user'));
});

export const commentCreate = asyncHandler(async (req, res) => {
    const { post, description } = req?.body;
    const { userId } = req;
    
    checkIsBlocked(await User.findById(userId));
    checkIsVerified(await User.findById(userId));

    await Comment.create({
        post,
        description,
        user: userId
    });

    res.json('The comment was submitted successfully :)');
});

export const commentUpdate = asyncHandler(async (req, res) => {
    const id = req?.params?.id;
    validateMongoDbId(id);

    const { description } = req?.body;

    await Comment.findByIdAndUpdate(id, { description });

    res.json('The comment was updated successfully :)');
});

export const commentDelete = asyncHandler(async (req, res) => {
    const {id} = req?.params;
    validateMongoDbId(id);

    await Comment.findByIdAndDelete(id);

    res.json('The comment was removed successfully :)');
});