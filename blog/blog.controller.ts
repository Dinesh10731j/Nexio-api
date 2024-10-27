import { Request, Response } from "express";
import { blogModel } from "./blog.model";
export const createBlog = async (req: Request, res: Response) => {
  try {
const {blog} = req.body;
const blogs = await blogModel.create({blog});


if(!blogs){
    res.status(400).json({message:'Failed to create blog'});
    return;

    
}

  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({
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
