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
exports.Session = void 0;
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const SessionUsers_1 = require("./SessionUsers");
const Group_1 = require("./Group");
let Session = class Session {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Session.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Session.prototype, "group_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Session.prototype, "movie_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Session.prototype, "assisted_in_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Session.prototype, "session_day", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Session.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Group_1.Group),
    (0, typeorm_1.JoinColumn)({ name: 'group_id' }),
    __metadata("design:type", Group_1.Group)
], Session.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User),
    (0, typeorm_1.JoinTable)({
        name: 'session_users',
        joinColumn: {
            name: 'session_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Session.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SessionUsers_1.SessionUsers, (sessionUsers) => sessionUsers.session),
    (0, typeorm_1.JoinColumn)({ name: 'session_id' }),
    __metadata("design:type", Array)
], Session.prototype, "sessionUsers", void 0);
Session = __decorate([
    (0, typeorm_1.Entity)({ name: 'sessions' }),
    __metadata("design:paramtypes", [])
], Session);
exports.Session = Session;
