"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupModel = exports.contactModel = exports.userProfileModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const signupSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "E-mail is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
});
const contactSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "E-mail is required"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
    },
});
const userProfileSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "UserId is required"],
    },
    profileUrl: String,
});
exports.userProfileModel = mongoose_1.default.model("UserProfiles", userProfileSchema);
exports.contactModel = mongoose_1.default.model("Contacts", contactSchema);
exports.signupModel = mongoose_1.default.model("Users", signupSchema);
