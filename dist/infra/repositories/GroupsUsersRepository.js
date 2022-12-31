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
exports.GroupsUsersRepository = void 0;
const GroupsUsers_1 = require("../entities/GroupsUsers");
const typeorm_1 = require("typeorm");
class GroupsUsersRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(GroupsUsers_1.GroupsUsers);
    }
    index({ group_id = null, user_id = null, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupsUsers = yield this.repository.find({
                where: Object.assign(Object.assign({}, (group_id && { group_id })), (user_id && { user_id })),
                join: {
                    alias: 'groups_users',
                    leftJoinAndSelect: {
                        groups: 'groups_users.group',
                        users: 'groups_users.user',
                    },
                },
            });
            return groupsUsers;
        });
    }
    findUserInGroup({ group_id, user_id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne({
                group_id,
                user_id,
            });
            return user;
        });
    }
    addUserToGroup({ user_id, group_id, is_admin, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupUser = this.repository.create({
                user_id,
                group_id,
                is_admin,
            });
            yield this.repository.save(groupUser);
        });
    }
    removeUserFromGroup({ group_id, user_id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete({
                group_id,
                user_id,
            });
        });
    }
}
exports.GroupsUsersRepository = GroupsUsersRepository;
