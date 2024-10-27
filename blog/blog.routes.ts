import { Router } from "express";
import { createBlog } from "./blog.controller";
const blogRouter = Router();
blogRouter.post("/blog/create-post",createBlog);

export default blogRouter;