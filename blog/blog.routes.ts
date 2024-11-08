import { Router } from "express";
import { createBlog,Blogs } from "./blog.controller";
import { authenticateUser } from "../middleware/authMiddleware";
const blogRouter = Router();
blogRouter.post("/blog/create-post",authenticateUser,createBlog);
blogRouter.get("/blogs",Blogs);

export default blogRouter;