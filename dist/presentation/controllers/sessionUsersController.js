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
exports.sessionUsersRoutes = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const JoinSessionUseCase_1 = require("../../core/useCases/session_users/JoinSessionUseCase");
const LeaveSessionUseCase_1 = require("../../core/useCases/session_users/LeaveSessionUseCase");
const checkAuthentication_1 = require("../../presentation/middlewares/checkAuthentication");
const sessionUsersRoutes = (0, express_1.Router)();
exports.sessionUsersRoutes = sessionUsersRoutes;
sessionUsersRoutes.post('/', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.body;
    const userId = req.usuario.id;
    const createSessionUseCase = tsyringe_1.container.resolve(JoinSessionUseCase_1.JoinSessionUseCase);
    const result = yield createSessionUseCase.execute({ userId, sessionId });
    return res.status(200).json(result);
}));
sessionUsersRoutes.delete('/:sessionId', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.params;
    const userId = req.usuario.id;
    const createSessionUseCase = tsyringe_1.container.resolve(LeaveSessionUseCase_1.LeaveSessionUseCase);
    yield createSessionUseCase.execute({ userId, sessionId });
    return res.status(200).json({ message: 'Usuário saiu da sessão' });
}));
