"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userContact = exports.Login = exports.Signup = void 0;
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ msg: "All fields are required", success: false });
            return;
        }
        const alreadyExists = yield user_model_1.signupModel.findOne({ email });
        if (alreadyExists) {
            res.status(400).json({ message: "User already exits", success: false });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const userData = yield user_model_1.signupModel.create({
            name,
            email,
            password: hashedPassword,
        });
        if (!userData) {
            res
                .status(422)
                .json({ message: "Failed to create user", success: false });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: userData === null || userData === void 0 ? void 0 : userData._id }, config_1.configuration.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({
            message: "User created successfully",
            success: true,
            accessToken: token,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                msg: "Internal server error",
                error: err.message,
                success: false,
            });
        }
        else {
            res.status(500).json({
                msg: "Internal server error",
                error: "Unknown error",
                success: false,
            });
        }
    }
});
exports.Signup = Signup;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ msg: "All fields are required", success: false });
            return;
        }
        const User = yield user_model_1.signupModel.findOne({ email });
        if (!User) {
            res.status(404).json({ message: "User not found", success: false });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, User.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials", success: false });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: User === null || User === void 0 ? void 0 : User._id }, config_1.configuration.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "User login successfull",
            success: true,
            accessToken: token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal server error",
                error: error === null || error === void 0 ? void 0 : error.message,
                success: false,
            });
        }
        else {
            res
                .status(500)
                .json({ message: "An unknown error occured", success: false });
        }
    }
});
exports.Login = Login;
const userContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            res
                .status(400)
                .json({ message: "All fields are required", success: false });
            return;
        }
        const alreadyExists = yield user_model_1.contactModel.findOne({ email });
        if (alreadyExists) {
            res.status(400).json({ message: "Message already exits", success: false });
            return;
        }
        const userContacts = yield user_model_1.contactModel.create({ name, email, message });
        if (!userContacts) {
            res.status(500).json({ message: "Failed to create message", success: false });
            return;
        }
        res.status(201).json({ message: "Message created sucessfully", success: true });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                error: error === null || error === void 0 ? void 0 : error.message,
            });
        }
        else {
            res
                .status(500)
                .json({ message: "An unknown error occured", success: false });
        }
    }
});
exports.userContact = userContact;
