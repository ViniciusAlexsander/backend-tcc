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
exports.CreateGroupUseCase = void 0;
const AppError_1 = require("../../../core/shared/errors/AppError");
const tsyringe_1 = require("tsyringe");
let CreateGroupUseCase = class CreateGroupUseCase {
    constructor(groupRepository, groupsUsersRepository) {
        this.groupRepository = groupRepository;
        this.groupsUsersRepository = groupsUsersRepository;
    }
    execute({ title, description, userId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsGroup = yield this.groupRepository.index({ title });
            if (existsGroup.length > 0) {
                throw new AppError_1.AppError('Group already exists');
            }
            const groupCreated = yield this.groupRepository.createGroup({
                title,
                description,
            });
            // add the first user as an administrator
            this.groupsUsersRepository.addUserToGroup({
                user_id: userId,
                group_id: groupCreated.id,
                is_admin: true,
            });
        });
    }
};
CreateGroupUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('GroupRepository')),
    __param(1, (0, tsyringe_1.inject)('GroupsUsersRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateGroupUseCase);
exports.CreateGroupUseCase = CreateGroupUseCase;
