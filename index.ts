import { configuration } from "./config/config";
import userRouter from "./user/user.route";
import connectDataBase from "./config/db";
const port = configuration.Port;
import express from "express";
const server = express();
server.use(express.json());
server.use("/api",userRouter);


const startServer = async () => {
    await connectDataBase();
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  };
  
  startServer();