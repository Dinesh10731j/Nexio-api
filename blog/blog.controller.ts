import { Request, Response } from "express";
import { blogModel } from "./blog.model";
import { parseEditorData } from "../utils/parseEditorData";
export const createBlog = async (req: Request, res: Response):Promise<void> => {
  try {
    const {blocks} = req.body;
    const { title, image, content } = parseEditorData(blocks);


    if(!title || !image || !content){
    res.status(400).json({message:'Empty data received',success:false});
    return;
    }
    const newBlogPost = new blogModel({
      title,
      image,
      content,
    });
    await newBlogPost.save();

    res.status(201).json({ message: 'Blog post created successfully', data: newBlogPost });


if(!newBlogPost){
   res.status(400).json({message:'Failed to create blog'});
   return;

}


  } 
  catch (error: unknown) {
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
