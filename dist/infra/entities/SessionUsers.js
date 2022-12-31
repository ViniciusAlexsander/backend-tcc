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
exports.SessionUsers = void 0;
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Session_1 = require("./Session");
let SessionUsers = class SessionUsers {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], SessionUsers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SessionUsers.prototype, "session_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SessionUsers.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SessionUsers.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], SessionUsers.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Session_1.Session),
    (0, typeorm_1.JoinColumn)({ name: 'session_id' }),
    __metadata("design:type", Session_1.Session)
], SessionUsers.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SessionUsers.prototype, "created_at", void 0);
SessionUsers = __decorate([
    (0, typeorm_1.Entity)({ name: 'session_users' }),
    __metadata("design:paramtypes", [])
], SessionUsers);
exports.SessionUsers = SessionUsers;
