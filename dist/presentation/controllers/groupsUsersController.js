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
exports.groupsUsersRoutes = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const AddUserToGroupUseCase_1 = require("../../core/useCases/groups_users/AddUserToGroupUseCase");
const FindGroupsUsersUseCase_1 = require("../../core/useCases/groups_users/FindGroupsUsersUseCase");
const RemoveUserFromGroup_1 = require("../../core/useCases/groups_users/RemoveUserFromGroup");
const checkAuthentication_1 = require("../middlewares/checkAuthentication");
const CheckUserAdminUseCase_1 = require("../../core/useCases/groups_users/CheckUserAdminUseCase");
const groupsUsersRoutes = (0, express_1.Router)();
exports.groupsUsersRoutes = groupsUsersRoutes;
groupsUsersRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findGroupsUsersUseCase = tsyringe_1.container.resolve(FindGroupsUsersUseCase_1.FindGroupsUsersUseCase);
    const { groupId, userId } = req.query;
    const groupsUsers = yield findGroupsUsersUseCase.execute({
        groupId,
        userId,
    });
    return res.status(200).json(groupsUsers);
}));
groupsUsersRoutes.get('/check-admin', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        groupId: req.query.groupId,
        userIdLogged: req.usuario.id,
    };
    const checkUserAdminUseCase = tsyringe_1.container.resolve(CheckUserAdminUseCase_1.CheckUserAdminUseCase);
    const response = yield checkUserAdminUseCase.execute(data);
    return res.status(200).json(response);
}));
groupsUsersRoutes.post('/', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addUserToGroup = tsyringe_1.container.resolve(AddUserToGroupUseCase_1.AddUserToGroupUseCase);
    const { groupId, userId, isAdmin } = req.body;
    const { id } = req.usuario;
    const userAdded = yield addUserToGroup.execute({
        groupId,
        userId,
        isAdmin,
        userIdLogged: id,
    });
    return res.status(201).json(userAdded);
}));
groupsUsersRoutes.delete('/', checkAuthentication_1.checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const removeUserFromGroup = tsyringe_1.container.resolve(RemoveUserFromGroup_1.RemoveUserFromGroupUseCase);
    const data = {
        groupId: req.query.groupId,
        userId: req.query.userId,
        userIdLogged: req.usuario.id,
    };
    yield removeUserFromGroup.execute(data);
}));
