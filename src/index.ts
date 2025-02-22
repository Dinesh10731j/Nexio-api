import { configuration } from "./config/config";
import userRouter from "./user/user.route";
import blogRouter from "./blog/blog.routes";
import connectDataBase from "./config/db";
import cors from "cors";
const port = configuration.Port;
import express from "express";
const server = express();
server.use(cors());
server.use(express.json({limit:'30mb'}));
server.use("/api", userRouter);
server.use("/api", blogRouter);

const startServer = async () => {
  await connectDataBase();
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();
