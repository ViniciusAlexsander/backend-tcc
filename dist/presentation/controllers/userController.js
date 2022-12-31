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
exports.userRoutes = void 0;
const FindUsersUseCase_1 = require("../../core/useCases/users/FindUsersUseCase");
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const CreateUserUseCase_1 = require("../../core/useCases/users/CreateUserUseCase");
const FindUserUseCase_1 = require("../../core/useCases/users/FindUserUseCase");
const checkAuthentication_1 = require("../../presentation/middlewares/checkAuthentication");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, userName, email, password } = req.body;
    const createUserUseCase = tsyringe_1.container.resolve(CreateUserUseCase_1.CreateUserUseCase);
    yield createUserUseCase.execute({
        name,
        userName,
        email,
        password,
    });
    return res.status(201).send();
}));
userRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findUserUseCase = tsyringe_1.container.resolve(FindUsersUseCase_1.FindUsersUseCase);
    const data = {
        id: req.query.id,
        userName: req.body.userName,
        email: req.body.email,
    };
    const users = yield findUserUseCase.execute(data);
    return res.status(201).json(users);
}));
userRoutes.get('/me', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findUserUseCase = tsyringe_1.container.resolve(FindUserUseCase_1.FindUserUseCase);
    const data = {
        id: req.usuario.id,
    };
    const users = yield findUserUseCase.execute(data);
    return res.status(201).json(users);
}));
