"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const blogRouter = (0, express_1.Router)();
blogRouter.post("/blog/create-post", authMiddleware_1.authenticateUser, blog_controller_1.createBlog);
blogRouter.get("/blogs", blog_controller_1.Blogs);
blogRouter.get('/:blogId', blog_controller_1.singleBlog);
blogRouter.get("/blog/user-blogs", blog_controller_1.userPosts);
exports.default = blogRouter;
