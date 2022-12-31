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
exports.UserRepository = void 0;
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
class UserRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(User_1.User);
    }
    index({ id = null, user_name = null, email = null, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.repository.find({
                where: Object.assign(Object.assign(Object.assign({}, (id && { id })), (user_name && { user_name })), (email && { email })),
            });
            return users;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.findOne(id);
            return user;
        });
    }
    createUser({ email, password, name, user_name, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = this.repository.create({
                name,
                email,
                password,
                user_name,
            });
            yield this.repository.save(usuario);
        });
    }
}
exports.UserRepository = UserRepository;
