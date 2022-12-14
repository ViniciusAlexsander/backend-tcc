"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.RemoveUserFromGroupUseCase = void 0;
const AppError_1 = require("../../../core/shared/errors/AppError");
const tsyringe_1 = require("tsyringe");
let RemoveUserFromGroupUseCase = class RemoveUserFromGroupUseCase {
    constructor(groupsUsersRepository, groupRepository) {
        this.groupsUsersRepository = groupsUsersRepository;
        this.groupRepository = groupRepository;
    }
    execute({ groupId, userId, userIdLogged, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.checkGroupExists(groupId)) {
                throw new AppError_1.AppError('Grupo n??o existe');
            }
            if (!this.checkIfUserLoggedIsInGroup(groupId, userIdLogged)) {
                throw new AppError_1.AppError('Usu??rio executando a opera????o n??o est?? no grupo');
            }
            if (!this.checkIfUserThatWillBeRemovedIsInGroup(groupId, userId)) {
                throw new AppError_1.AppError('O usu??rio n??o est?? no grupo');
            }
            if (!this.checkIfUserLoggedIsAdmin(groupId, userIdLogged)) {
                throw new AppError_1.AppError('Usu??rio n??o ?? administrador');
            }
            yield this.groupsUsersRepository.removeUserFromGroup({
                group_id: groupId,
                user_id: userId,
            });
        });
    }
    checkGroupExists(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this.groupRepository.index({ id: groupId }));
        });
    }
    checkIfUserLoggedIsInGroup(groupId, userIdLogged) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this.groupsUsersRepository.findUserInGroup({
                group_id: groupId,
                user_id: userIdLogged,
            }));
        });
    }
    checkIfUserThatWillBeRemovedIsInGroup(groupId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this.groupsUsersRepository.findUserInGroup({
                group_id: groupId,
                user_id: userId,
            }));
        });
    }
    checkIfUserLoggedIsAdmin(groupId, userIdLogged) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogged = yield this.groupsUsersRepository.index({
                group_id: groupId,
                user_id: userIdLogged,
            });
            return userLogged[0].is_admin;
        });
    }
};
RemoveUserFromGroupUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('GroupsUsersRepository')),
    __param(1, (0, tsyringe_1.inject)('GroupRepository')),
    __metadata("design:paramtypes", [Object, Object])
], RemoveUserFromGroupUseCase);
exports.RemoveUserFromGroupUseCase = RemoveUserFromGroupUseCase;
