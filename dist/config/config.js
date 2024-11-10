"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.configuration = {
    Port: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_TOKEN: process.env.JWT_TOKEN,
    JWT_SECRET: process.env.JWT_SECRET,
};
