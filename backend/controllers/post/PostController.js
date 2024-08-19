import asyncHandler from 'express-async-handler';
import Post from '../../models/post/Post.js'
import fs from 'fs';
import { cloudinaryUploadImage } from '../../utils/Cloudinary.js';
import { validateMongoDbId } from '../../utils/ValidateMongoDbId.js';

export const getAllPosts = asyncHandler(async (req, res) => {
    res.json(await Post.find({}).populate('user'));
});

export const getSinglePost = asyncHandler(async (req, res) => {
    const {id} = req?.params;
    validateMongoDbId(id);

    res.json(await Post.findByIdAndUpdate(id, {
        $inc : {views: 1}
    }, {new : true}).populate('user'));
});

export const postCreate = asyncHandler(async (req, res) => {
    const imageLocalPath = `public/images/post-images/${req.file.filename}`;
    const uploadedImage = await cloudinaryUploadImage(imageLocalPath);
    fs.unlinkSync(imageLocalPath);

    await Post.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: uploadedImage.url
    });

    res.json('The post submitted successfully :)');
});

export const postUpdate = asyncHandler(async (req, res) => {
    const {id} = req?.params;
    validateMongoDbId(id);

    res.json(await Post.findByIdAndUpdate(id, req?.body, {new: true}));
});