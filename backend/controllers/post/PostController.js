import asyncHandler from 'express-async-handler';
import Post from '../../models/post/Post.js';
import fs from 'fs';
import { cloudinaryUploadImage } from '../../utils/Cloudinary.js';
import { validateMongoDbId } from '../../utils/ValidateMongoDbId.js';

export const getAllPosts = asyncHandler(async (req, res) => {
    res.json(await Post.find({}).populate('user'));
});

export const getSinglePost = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    res.json(await Post.findByIdAndUpdate(id, {
        $inc: { views: 1 }
    }, { new: true }).populate('user').populate('likes').populate('dislikes').populate('comments'));
});

export const postCreate = asyncHandler(async (req, res) => {
    const imageLocalPath = `public/images/post-images/${req.file.filename}`;
    const uploadedImage = await cloudinaryUploadImage(imageLocalPath);
    fs.unlinkSync(imageLocalPath);

    await Post.create({
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: uploadedImage.url
    });

    res.json('The post submitted successfully :)');
});

export const postUpdate = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    await Post.findByIdAndUpdate(id, req.body, { new: true });

    res.json('The post updated succesfully :)');
});

export const postDelete = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    await Post.findByIdAndDelete(id);

    res.json('The post removed succesfully');
});

export const postToggleLike = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    const loginUserId = req?.userId;
    const post = await Post.findById(id);

    if (post.dislikes.find(userId => userId.toString() === loginUserId.toString())) {
        await Post.findByIdAndUpdate(id, {
            $pull: { dislikes: loginUserId },
            isDisliked: false
        });
    }

    if (post.isLiked) {
        await Post.findByIdAndUpdate(id, {
            $pull: { likes: loginUserId },
            isLiked: false
        });

        res.json('The post was unliked successfully !');
    } else {
        await Post.findByIdAndUpdate(id, {
            $push: { likes: loginUserId },
            isLiked: true
        });

        res.json('The post was liked successfully !');
    }
});

export const postToggleDislike = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    validateMongoDbId(id);

    const loginUserId = req?.userId;
    const post = await Post.findById(id);

    if (post.likes.find(userId => userId.toString() === loginUserId.toString())) {
        await Post.findByIdAndUpdate(id, {
            $pull: { likes: loginUserId },
            isLiked: false
        });
    }

    if (post.isDisliked) {
        await Post.findByIdAndUpdate(id, {
            $pull: { dislikes: loginUserId },
            isDisliked: false
        });

        res.json('The post was undisliked successfully !');
    } else {
        await Post.findByIdAndUpdate(id, {
            $push: { dislikes: loginUserId },
            isDisliked: true
        });

        res.json('The post was disliked successfully !');
    }
});