import express from "express";
import { Signup, Login, userContact,userProfileImage } from "./user.controller";
const userRouter = express.Router();

userRouter.post("/user/signup", Signup);
userRouter.post("/user/login", Login);
userRouter.post("/user/message", userContact);
userRouter.post("/user/profile/image",userProfileImage)

export default userRouter;
