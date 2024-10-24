import express from "express";
import { Signup, Login, userContact } from "./user.controller";
const userRouter = express();

userRouter.post("/user/signup", Signup);
userRouter.post("/user/login", Login);
userRouter.post("/user/message", userContact);

export default userRouter;
