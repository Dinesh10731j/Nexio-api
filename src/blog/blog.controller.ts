import { Request, Response } from "express";
import { blogModel } from "./blog.model";
import { AuthRequest } from "../middleware/authMiddleware";
import { readingTime } from "../utils/readTime";
export const createBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { blocks } = req.body;
    const content = blocks.map((block: { data: { text: unknown; }; }) => block.data.text).join(" ");
    const readTime = readingTime(content);

  

    const _req = req as unknown as AuthRequest;
    const newBlogPost = new blogModel({
     
      content,
      author: _req.id,
      readingTime: readTime,
      blocks,
    });
    await newBlogPost.save();

    res
      .status(201)
      .json({ message: "Blog post created successfully", data: newBlogPost });

    if (!newBlogPost) {
      res.status(400).json({ message: "Failed to create blog" });
      return;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        error: error?.message,
      });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occured", success: false });
    }
  }
};

export const Blogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await blogModel
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        error: error.message,
      });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occured", success: false });
    }
  }
};

export const singleBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { blogId } = req.params;

    if (!blogId) {
      res.status(400).json({ message: "BlogId is required", success: false });
      return;
    }
    const singleBlog = await blogModel
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        error: error?.message,
      });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error coccured", success: false });
    }
  }
};

export const userPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const _req = req as unknown as AuthRequest;
    console.log(_req?.id);

    const posts = await blogModel.find({});

    if (!posts) {
      res.status(400).json({ message: "Post not found", success: false });
      return;
    }

    res
      .status(200)
      .json({
        message: "Posts fetched successfully",
        success: true,
        Posts: posts,
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Internal server error ",
        success: false,
        error: error?.message,
      });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occured", success: false });
    }
  }
};
