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
exports.SessionUsersRepository = void 0;
const typeorm_1 = require("typeorm");
const SessionUsers_1 = require("../../infra/entities/SessionUsers");
class SessionUsersRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(SessionUsers_1.SessionUsers);
    }
    joinSession({ session_id, user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionUsers = this.repository.create({
                session_id,
                user_id,
                rating: 0,
            });
            yield this.repository.save(sessionUsers);
        });
    }
    leaveSession({ session_id, user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete({ session_id, user_id });
        });
    }
}
exports.SessionUsersRepository = SessionUsersRepository;
