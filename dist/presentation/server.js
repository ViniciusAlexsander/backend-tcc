"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const typeorm_1 = __importDefault(require("../infra/typeorm"));
require("../core/domain/container/index");
const controllers_1 = require("./controllers");
const AppError_1 = require("../core/shared/errors/AppError");
(0, typeorm_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(controllers_1.router);
app.use((err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res
        .status(500)
        .json({ message: `Internal server error - ${err.message}` });
});
const port = process.env.PORT || 3333;
app.listen(port, () => console.log("Server is running on port: " + port));
