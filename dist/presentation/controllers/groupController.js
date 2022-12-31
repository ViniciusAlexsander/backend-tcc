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
exports.groupRoutes = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const CreateGroupUseCase_1 = require("../../core/useCases/groups/CreateGroupUseCase");
const FindGroupsUseCase_1 = require("../../core/useCases/groups/FindGroupsUseCase");
const checkAuthentication_1 = require("../middlewares/checkAuthentication");
const DeleteGroupUseCase_1 = require("../../core/useCases/groups/DeleteGroupUseCase");
const groupRoutes = (0, express_1.Router)();
exports.groupRoutes = groupRoutes;
groupRoutes.post('/', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createGroupUseCase = tsyringe_1.container.resolve(CreateGroupUseCase_1.CreateGroupUseCase);
    const data = {
        title: req.body.title,
        description: req.body.description,
        userId: req.usuario.id,
    };
    yield createGroupUseCase.execute(data);
    return res.status(201).json({ message: 'Group created' });
}));
groupRoutes.get('/', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findGroupsUseCase = tsyringe_1.container.resolve(FindGroupsUseCase_1.FindGroupsUseCase);
    const { id, title, isMember } = req.query;
    const group = yield findGroupsUseCase.execute({
        id,
        title,
        isMember,
        idUserLogged: req.usuario.id,
    });
    return res.status(200).json(group);
}));
groupRoutes.delete('/:id', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteGroupUseCase = tsyringe_1.container.resolve(DeleteGroupUseCase_1.DeleteGroupUseCase);
    const { id } = req.params;
    yield deleteGroupUseCase.execute({ id });
    return res.status(200).json({ message: 'Group deleted' });
}));
