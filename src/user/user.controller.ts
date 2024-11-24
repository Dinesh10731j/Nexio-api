import { Request, Response } from "express";
import { signupModel, contactModel, userProfileModel } from "./user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configuration } from "../config/config";
import { AuthRequest } from "../middleware/authMiddleware";

export const Signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ msg: "All fields are required", success: false });
      return;
    }

    const alreadyExists = await signupModel.findOne({ email });

    if (alreadyExists) {
      res.status(400).json({ message: "User already exits", success: false });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await signupModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!userData) {
      res
        .status(422)
        .json({ message: "Failed to create user", success: false });

      return;
    }

    const token = jwt.sign(
      { id: userData?.id },
      configuration.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully",
      success: true,
      accessToken: token,
    });
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

export const Login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ msg: "All fields are required", success: false });
      return;
    }

    const User = await signupModel.findOne({ email });

    if (!User) {
      res.status(404).json({ message: "User not found", success: false });

      return;
    }

    const isMatch = await bcrypt.compare(password, User.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials", success: false });

      return;
    }

    const token = jwt.sign(
      { id: User?._id },
      configuration.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "User login successfull",
      success: true,
      accessToken: token,
      username: User?.name,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Internal server error",
        error: error?.message,
        success: false,
      });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occured", success: false });
    }
  }
};

export const userContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res
        .status(400)
        .json({ message: "All fields are required", success: false });
      return;
    }

    const alreadyExists = await contactModel.findOne({ email });

    if (alreadyExists) {
      res
        .status(400)
        .json({ message: "Message already exits", success: false });
      return;
    }

    const userContacts = await contactModel.create({ name, email, message });

    if (!userContacts) {
      res
        .status(500)
        .json({ message: "Failed to create message", success: false });
      return;
    }

    res
      .status(201)
      .json({ message: "Message created sucessfully", success: true });
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

export const userProfileImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { profileUrl } = req.body;

    const _req = req as unknown as AuthRequest;
    const userId = _req?.id;

    if (!profileUrl) {
      res
        .status(400)
        .json({ message: "ProfileUrl is required", success: false });
      return;
    }

    if (!userId) {
      res.status(400).json({ message: "UserId is required", success: false });

      return;
    }

    const userProfile = await userProfileModel.create({ profileUrl, userId });

    if (!userProfile) {
      res
        .status(500)
        .json({ message: "Failed to create profile Image", success: false });
      return;
    }

    res
      .status(201)
      .json({ message: "Profile image uploaded successfully", success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occured", success: false });
    }
  }
};

export const profileImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const _req = req as unknown as AuthRequest;
    const userId = _req?.id;



    const userProfile = await userProfileModel.findOne({ userId });

    if (!userProfile) {
      res
        .status(404)
        .json({ message: "User profile not found", success: false });
      return;
    }

    res
      .status(200)
      .json({ message: "User profile fetched successfully", success: true,profile:userProfile });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({
          message: "Internal server",
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
