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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsUsers = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Group_1 = require("./Group");
const User_1 = require("./User");
let GroupsUsers = class GroupsUsers {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], GroupsUsers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GroupsUsers.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GroupsUsers.prototype, "group_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], GroupsUsers.prototype, "is_admin", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], GroupsUsers.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Group_1.Group),
    (0, typeorm_1.JoinColumn)({ name: 'group_id' }),
    __metadata("design:type", Group_1.Group)
], GroupsUsers.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], GroupsUsers.prototype, "created_at", void 0);
GroupsUsers = __decorate([
    (0, typeorm_1.Entity)({ name: 'groups_users' }),
    __metadata("design:paramtypes", [])
], GroupsUsers);
exports.GroupsUsers = GroupsUsers;
