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
exports.FindGroupsUseCase = void 0;
const tsyringe_1 = require("tsyringe");
let FindGroupsUseCase = class FindGroupsUseCase {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
    execute({ id, title, isMember, idUserLogged, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const groups = yield this.groupRepository.index({
                id,
                title,
            });
            if (isMember) {
                // if isMember is true, filter groups where user is member
                return this.formatGroup(groups.filter((group) => group.users.find((user) => user.id === idUserLogged)));
            }
            return this.formatGroup(groups);
        });
    }
    formatGroup(groups) {
        return groups.map((group) => {
            return {
                id: group.id,
                title: group.title,
                description: group.description,
                users: group.users.map((user) => {
                    const { joinedAt, isAdmin } = this.getUserInGroupData(user.id, group.groupsUsers);
                    // format users in group
                    return {
                        id: user.id,
                        username: user.user_name,
                        isAdmin,
                        joinedAt,
                    };
                }),
            };
        });
    }
    getUserInGroupData(userId, groupsUsers) {
        // get user joined date in group
        const user = groupsUsers.find((groupUser) => groupUser.user_id === userId);
        return {
            joinedAt: user.created_at,
            isAdmin: user.is_admin,
        };
    }
};
FindGroupsUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('GroupRepository')),
    __metadata("design:paramtypes", [Object])
], FindGroupsUseCase);
exports.FindGroupsUseCase = FindGroupsUseCase;
