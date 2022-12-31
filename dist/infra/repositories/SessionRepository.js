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
exports.SessionRepository = void 0;
const Session_1 = require("../entities/Session");
const typeorm_1 = require("typeorm");
const SessionUsers_1 = require("../../infra/entities/SessionUsers");
class SessionRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Session_1.Session);
        this.sessionUsersRepository = (0, typeorm_1.getRepository)(SessionUsers_1.SessionUsers);
    }
    create({ group_id, movie_id, assisted_in_id, session_day, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = this.repository.create({
                group_id,
                movie_id,
                session_day,
                assisted_in_id,
            });
            yield this.repository.save(session);
        });
    }
    delete({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
    index({ group_id = null, assisted_in_id = null, movie_id = null, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessions = yield this.repository.find({
                where: Object.assign(Object.assign(Object.assign({}, (group_id && { group_id })), (assisted_in_id && { assisted_in_id })), (movie_id && { movie_id })),
                relations: ['group', 'users'],
            });
            return sessions;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.repository.findOne({ id });
            return session;
        });
    }
    findSessionUser({ session_id, user_id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionUsers = yield this.sessionUsersRepository.findOne({
                session_id,
                user_id,
            });
            return sessionUsers;
        });
    }
}
exports.SessionRepository = SessionRepository;
