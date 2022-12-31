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
exports.Group = void 0;
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const GroupsUsers_1 = require("./GroupsUsers");
let Group = class Group {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Group.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Group.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Group.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Group.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User),
    (0, typeorm_1.JoinTable)({
        name: 'groups_users',
        joinColumn: {
            name: 'group_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Group.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => GroupsUsers_1.GroupsUsers, (groupsUsers) => groupsUsers.group),
    (0, typeorm_1.JoinColumn)({ name: 'group_id' }),
    __metadata("design:type", Array)
], Group.prototype, "groupsUsers", void 0);
Group = __decorate([
    (0, typeorm_1.Entity)({ name: 'groups' }),
    __metadata("design:paramtypes", [])
], Group);
exports.Group = Group;
