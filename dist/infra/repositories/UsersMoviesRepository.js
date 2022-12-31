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
exports.UsersMoviesRepository = void 0;
const typeorm_1 = require("typeorm");
const UsersMovies_1 = require("../../infra/entities/UsersMovies");
class UsersMoviesRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(UsersMovies_1.UsersMovies);
    }
    create({ movie_id, user_id, watched, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMovie = this.repository.create({
                user_id,
                movie_id,
                watched,
            });
            return yield this.repository.save(userMovie);
        });
    }
    update({ movie_id, user_id, watched, favorite, rating, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let userMovie = yield this.repository.findOne({
                user_id,
                movie_id,
            });
            userMovie = Object.assign(Object.assign(Object.assign(Object.assign({}, userMovie), (watched !== undefined && { watched })), (favorite !== undefined && { favorite })), (rating !== undefined && { rating }));
            return yield this.repository.save(userMovie);
        });
    }
    delete({ user_id, movie_id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete({
                user_id,
                movie_id,
            });
        });
    }
    index({ user_id, watched, favorite, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const allRelationsCondition = watched === null && favorite !== null;
            console.log(`watched: ${watched}, favorite: ${favorite}`);
            return yield this.repository.find({
                where: Object.assign(Object.assign(Object.assign(Object.assign({ user_id }, (watched === '0' && { watched: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) })), (watched === '1' && { watched: true })), (watched === '2' && { watched: false })), (favorite && { favorite })),
            });
        });
    }
    findOne({ movie_id, user_id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({
                user_id,
                movie_id,
            });
        });
    }
}
exports.UsersMoviesRepository = UsersMoviesRepository;
