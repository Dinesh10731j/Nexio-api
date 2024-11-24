import express from "express";
import { Signup, Login, userContact,userProfileImage,profileImage } from "./user.controller";
import { authenticateUser } from "../middleware/authMiddleware";
const userRouter = express.Router();

userRouter.post("/user/signup", Signup);
userRouter.post("/user/login", Login);
userRouter.post("/user/message", userContact);
userRouter.post("/user/profile/image",authenticateUser,userProfileImage);
userRouter.get('/user/profile/image',authenticateUser,profileImage);

export default userRouter;
