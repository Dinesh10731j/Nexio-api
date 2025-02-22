"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPagination = exports.countViews = exports.deletePost = exports.userPosts = exports.singleBlog = exports.Blogs = exports.createBlog = void 0;
const blog_model_1 = require("./blog.model");
const readTime_1 = require("../utils/readTime");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blocks } = req.body;
        const content = blocks
            .map((block) => block.data.text)
            .join(" ");
        const readTime = (0, readTime_1.readingTime)(content);
        const _req = req;
        const newBlogPost = new blog_model_1.blogModel({
            content,
            author: _req.id,
            readingTime: readTime,
            blocks,
        });
        yield newBlogPost.save();
        if (!newBlogPost) {
            res.status(400).json({ message: "Failed to create blog" });
            return;
        }
        res
            .status(201)
            .json({ message: "Blog post created successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                error: error === null || error === void 0 ? void 0 : error.message,
            });
        }
        else {
            res
                .status(500)
                .json({ message: "An unknown error occured", success: false });
        }
    }
});
exports.createBlog = createBlog;
const Blogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_model_1.blogModel
            .find({})
            .populate("author", "name")
            .sort({ publishedDate: -1 });
        if (!blogs || blogs.length === 0) {
            res.status(404).json({ message: "No blogs available.", success: false });
            return;
        }
        res.status(200).json({
            message: "Blogs fetched successfully",
            success: true,
            Blogs: blogs,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                error: error.message,
            });
        }
        else {
            res
                .status(500)
                .json({ message: "An unknown error occured", success: false });
        }
    }
});
exports.Blogs = Blogs;
const singleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        if (!blogId) {
            res.status(400).json({ message: "BlogId is required", success: false });
            return;
        }
        const singleBlog = yield blog_model_1.blogModel
            .findById(blogId)
            .populate("author", "name");
        if (!singleBlog) {
            res.status(404).json({ message: "Blogs not found", success: false });
        }
        res.status(200).json({
            message: "Blog feteched successfully",
            success: true,
            blog: singleBlog,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                error: error === null || error === void 0 ? void 0 : error.message,
            });
        }
        else {
            res
                .status(500)
                .json({ message: "An unknown error coccured", success: false });
        }
    }
});
exports.singleBlog = singleBlog;
const userPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _req = req;
        const userId = _req.id;
        const posts = yield blog_model_1.blogModel.find({ author: userId }).populate("author", "name");
        if (!posts || posts.length === 0) {
            res.status(404).json({ message: "No posts found for this user", success: false });
            return;
        }
        res.status(200).json({
            message: "Posts fetched successfully",
            success: true,
            Posts: posts,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred", success: false });
        }
    }
});
exports.userPosts = userPosts;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.body;
        if (postId === null || undefined) {
            res.status(400).json({ message: 'PostId is required', success: false });
            return;
        }
        const userPost = yield blog_model_1.blogModel.findByIdAndDelete(postId);
        if (!userPost) {
            res.status(400).json({ message: 'Failed to delete post', success: false });
            return;
        }
        res.status(200).json({ message: 'Post deleted successfuly', success: true });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', success: false, error: error === null || error === void 0 ? void 0 : error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occured', success: false });
        }
    }
});
exports.deletePost = deletePost;
const countViews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        if (!blogId) {
            res.status(400).json({ message: 'BlogId is missing', success: false });
            return;
        }
        const blogs = yield blog_model_1.blogModel.findByIdAndUpdate(blogId, { $inc: { views: 1 } }, { new: true });
        if (!blogs) {
            res.status(404).json({ message: 'Blog not found', success: false });
            return;
        }
        res.status(200).json({ blogs: blogs, message: 'Blogs feteched successfully', success: true });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', success: false, error: error === null || error === void 0 ? void 0 : error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occured', success: false });
        }
    }
});
exports.countViews = countViews;
const blogPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        const blogs = yield blog_model_1.blogModel.find().populate("author", "name").skip(skip).limit(limit);
        const totalBlogs = yield blog_model_1.blogModel.countDocuments();
        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalBlogs / limit),
            totalBlogs,
            data: blogs,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "An unknown error occurred",
                success: false,
            });
        }
    }
});
exports.blogPagination = blogPagination;
