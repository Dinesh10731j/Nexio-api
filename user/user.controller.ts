import { Request, Response } from "express";
import signupModel from "./user.model";

export const Signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ msg: "All fields are required", success: false });
      return;
    }

    const userData = await signupModel.create({ name, email, password });

    if (!userData) {
      res
        .status(422)
        .json({ message: "Failed to create user", success: false });

      return;
    }

    res.status(201).json({ msg: "User created successfully", success: true });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        msg: "Internal server error",
        error: err.message,
        success: false,
      });
    } else {
      res.status(500).json({
        msg: "Internal server error",
        error: "Unknown error",
        success: false,
      });
    }
  }
};
