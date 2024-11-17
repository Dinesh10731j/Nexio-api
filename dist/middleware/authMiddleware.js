"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const authenticateUser = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized", success: false });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.configuration.JWT_SECRET);
        const _req = req;
        _req.id = decoded.id;
        next();
    }
    catch (error) {
        res
            .status(401)
            .json({ message: "Invalid token", success: false, error: error });
    }
};
exports.authenticateUser = authenticateUser;