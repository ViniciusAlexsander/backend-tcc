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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.CreateSessionUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../shared/errors/AppError");
let CreateSessionUseCase = class CreateSessionUseCase {
    constructor(sessionRepository, groupRepository) {
        this.sessionRepository = sessionRepository;
        this.groupRepository = groupRepository;
    }
    execute({ groupId, movieId, assistedInId, sessionDay, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield this.groupRepository.index({ id: groupId });
                const movieAlreadyWatched = yield this.sessionRepository.index({
                    movie_id: movieId,
                    group_id: groupId,
                });
                if (!group) {
                    throw new AppError_1.AppError('Group not found');
                }
                if (movieAlreadyWatched.length > 0) {
                    throw new AppError_1.AppError('Movie already watched', 409);
                }
                // TODO: check if movie exists in TMDB
                const sessionCreate = yield this.sessionRepository.create({
                    group_id: groupId,
                    movie_id: movieId,
                    assisted_in_id: assistedInId,
                    session_day: sessionDay,
                });
                return;
            }
            catch (error) {
                throw new AppError_1.AppError(error.message);
            }
        });
    }
};
CreateSessionUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('SessionRepository')),
    __param(1, (0, tsyringe_1.inject)('GroupRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateSessionUseCase);
exports.CreateSessionUseCase = CreateSessionUseCase;
