"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
    },
    title: { type: String, required: true },
    image: {
        url: String,
        caption: String,
    },
    content: { type: String, required: true },
    publishedDate: {
        type: Date,
        default: Date.now(),
    },
    readingTime: {
        type: Number,
    },
}, { timestamps: true });
exports.blogModel = mongoose_1.default.model("Blogs", blogSchema);
