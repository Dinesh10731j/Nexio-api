import { configuration } from "./config/config";
import userRouter from "./user/user.route";
const port = configuration.Port;
import express from "express";
const server = express();
server.use(express.json());
server.use("/api",userRouter);


server.listen(port,()=>{
    console.log(`Listening to ${port}`);
})