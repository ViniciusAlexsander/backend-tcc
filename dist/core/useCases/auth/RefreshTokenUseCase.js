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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const tsyringe_1 = require("tsyringe");
const auth_1 = __importDefault(require("../../shared/config/auth"));
const AppError_1 = require("../../shared/errors/AppError");
let RefreshTokenUseCase = class RefreshTokenUseCase {
    constructor(tokensUsersRepository) {
        this.tokensUsersRepository = tokensUsersRepository;
    }
    execute(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { secretRefreshToken, expiresInRefreshToken, expiresRefreshTokenDays, secretToken, expiresInToken, } = auth_1.default;
            const { email, sub } = (0, jsonwebtoken_1.verify)(refreshToken, secretRefreshToken);
            const userId = sub;
            const usuarioToken = yield this.tokensUsersRepository.findRefreshTokenByUserId(userId, refreshToken);
            if (!usuarioToken) {
                throw new AppError_1.AppError('Refresh token não existe');
            }
            if ((0, dayjs_1.default)().isAfter(usuarioToken.expiration_date)) {
                yield this.tokensUsersRepository.removeById(usuarioToken.id);
                throw new AppError_1.AppError('Refresh token expirou, por favor crie uma nova sessão');
            }
            yield this.tokensUsersRepository.removeById(usuarioToken.id);
            const novoRefreshToken = (0, jsonwebtoken_1.sign)({ email }, secretRefreshToken, {
                subject: userId,
                expiresIn: expiresInRefreshToken,
            });
            yield this.tokensUsersRepository.create({
                expirationDate: (0, dayjs_1.default)().add(expiresRefreshTokenDays, 'days').toDate(),
                refreshToken: novoRefreshToken,
                userId: userId,
            });
            const token = (0, jsonwebtoken_1.sign)({}, secretToken, {
                subject: userId,
                expiresIn: expiresInToken,
            });
            return {
                token,
                expiresInToken: (0, dayjs_1.default)().add(15, 'minute').toDate(),
                refreshToken: novoRefreshToken,
            };
        });
    }
};
RefreshTokenUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('TokensUsersRepository')),
    __metadata("design:paramtypes", [Object])
], RefreshTokenUseCase);
exports.RefreshTokenUseCase = RefreshTokenUseCase;
