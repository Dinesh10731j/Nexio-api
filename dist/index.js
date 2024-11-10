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
const config_1 = require("./config/config");
const user_route_1 = __importDefault(require("./user/user.route"));
const blog_routes_1 = __importDefault(require("./blog/blog.routes"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const port = config_1.configuration.Port;
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json({ limit: '30mb' }));
server.use("/api", user_route_1.default);
server.use("/api", blog_routes_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
startServer();
