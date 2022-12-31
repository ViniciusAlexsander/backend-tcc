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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const AutenticarUsuarioUseCase_1 = require("../../core/useCases/auth/AutenticarUsuarioUseCase");
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const RefreshTokenUseCase_1 = require("../../core/useCases/auth/RefreshTokenUseCase");
const authRoutes = (0, express_1.Router)();
exports.authRoutes = authRoutes;
authRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    const authenticateUserUseCase = tsyringe_1.container.resolve(AutenticarUsuarioUseCase_1.AuthenticateUserUseCase);
    const token = yield authenticateUserUseCase.execute({
        email,
        password,
    });
    return res.json(token);
}));
authRoutes.post('/refresh-token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken ||
        req.headers['x-access-token'] ||
        req.query.refreshToken;
    const refreshTokenUseCase = tsyringe_1.container.resolve(RefreshTokenUseCase_1.RefreshTokenUseCase);
    const newRefreshToken = yield refreshTokenUseCase.execute(refreshToken);
    return res.json(newRefreshToken);
}));
