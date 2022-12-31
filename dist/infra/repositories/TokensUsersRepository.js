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
exports.TokensUsersRepository = void 0;
const TokensUsers_1 = require("../entities/TokensUsers");
const typeorm_1 = require("typeorm");
class TokensUsersRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(TokensUsers_1.TokensUsers);
    }
    findRefreshTokenByUserId(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.repository.findOne({
                user_id: userId,
                refresh_token: refreshToken,
            });
            return token;
        });
    }
    removeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
    create({ expirationDate, refreshToken, userId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenUser = this.repository.create({
                expiration_date: expirationDate,
                refresh_token: refreshToken,
                user_id: userId,
            });
            yield this.repository.save(tokenUser);
            return tokenUser;
        });
    }
}
exports.TokensUsersRepository = TokensUsersRepository;
