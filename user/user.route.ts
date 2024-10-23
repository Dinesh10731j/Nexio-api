import express from "express";
import { Signup } from "./user.controller";
const userRouter = express();

userRouter.post("/user/signup", Signup);

export default userRouter;
