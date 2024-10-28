import { Router } from "express";
import { createBlog,Blogs } from "./blog.controller";
const blogRouter = Router();
blogRouter.post("/blog/create-post",createBlog);
blogRouter.get("/blogs",Blogs);

export default blogRouter;