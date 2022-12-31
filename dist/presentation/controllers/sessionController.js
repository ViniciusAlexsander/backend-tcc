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
exports.sessionRoutes = void 0;
const CreateSessionUseCase_1 = require("../../core/useCases/sessions/CreateSessionUseCase");
const FindByIdSessionUseCase_1 = require("../../core/useCases/sessions/FindByIdSessionUseCase");
const FindSessionsUseCase_1 = require("../../core/useCases/sessions/FindSessionsUseCase");
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const checkAuthentication_1 = require("../middlewares/checkAuthentication");
const DeleteSessionUseCase_1 = require("../../core/useCases/sessions/DeleteSessionUseCase");
exports.sessionRoutes = (0, express_1.Router)();
exports.sessionRoutes.post('/', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, movieId, assistedInId, sessionDay } = req.body;
    const createSessionUseCase = tsyringe_1.container.resolve(CreateSessionUseCase_1.CreateSessionUseCase);
    const result = yield createSessionUseCase.execute({
        groupId,
        movieId,
        assistedInId,
        sessionDay,
    });
    return res.status(201).json(result);
}));
exports.sessionRoutes.get('/', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        groupId: req.query.groupId,
        movieId: req.query.movieId,
        assistedInId: req.query.assistedInId,
    };
    const findSessionsUseCase = tsyringe_1.container.resolve(FindSessionsUseCase_1.FindSessionsUseCase);
    const result = yield findSessionsUseCase.execute(data);
    return res.status(200).json(result);
}));
exports.sessionRoutes.get('/:id', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const createSessionUseCase = tsyringe_1.container.resolve(FindByIdSessionUseCase_1.FindSessionByIdUseCase);
    const result = yield createSessionUseCase.execute(id);
    return res.status(200).json(result);
}));
exports.sessionRoutes.delete('/:id', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const createSessionUseCase = tsyringe_1.container.resolve(DeleteSessionUseCase_1.DeleteSessionUseCase);
    const result = yield createSessionUseCase.execute(id);
    return res.status(200).json(result);
}));
