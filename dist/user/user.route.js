"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userRouter = express_1.default.Router();
userRouter.post("/user/signup", user_controller_1.Signup);
userRouter.post("/user/login", user_controller_1.Login);
userRouter.post("/user/message", user_controller_1.userContact);
exports.default = userRouter;
