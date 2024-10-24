import express from "express";
import { Signup,Login } from "./user.controller";
const userRouter = express();

userRouter.post("/user/signup", Signup);
userRouter.post("/user/login",Login);

export default userRouter;
