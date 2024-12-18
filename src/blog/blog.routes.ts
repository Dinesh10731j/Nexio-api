import { Router } from "express";
import { createBlog,Blogs,singleBlog,userPosts,deletePost,countViews,blogPagination } from "./blog.controller";
import { authenticateUser } from "../middleware/authMiddleware";
const blogRouter = Router();
blogRouter.post("/blog/create-post",authenticateUser,createBlog);
blogRouter.get("/blogs",Blogs);
blogRouter.get('/:blogId',singleBlog);
blogRouter.get("/blog/user-blogs",authenticateUser,userPosts);
blogRouter.delete("/delete-post",deletePost);
blogRouter.get('/blog/views/:blogId',countViews);
blogRouter.get('/blog/items',blogPagination);

export default blogRouter;