import asyncHandler from "express-async-handler";
import Category from "../../models/category/Category.js";

export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({}).populate('user');
    res.json(categories);
});

export const getSingleCategory = asyncHandler(async (req, res) => {
    const { id } = req?.params;
    const category = await Category.findById(id).populate('user');

    res.json(category);
});

export const categoryCreate = asyncHandler(async (req, res) => {
    await Category.create({
        user: req?.userId,
        title: req?.body?.title
    });

    res.json('The category added successfully !');
});

export const categoryUpdate = asyncHandler(async (req, res) => {
    const { id } = req?.params;

    await Category.findByIdAndUpdate(id, { 
        title : req?.body
    }, { new: true }).populate('user');

    res.json("The category modified seccessfully !");
});

export const categoryDelete = asyncHandler(async (req, res) => {
    const {id} = req?.params;

    await Category.findByIdAndDelete(id);

    res.json("The category removed successfully !");
});