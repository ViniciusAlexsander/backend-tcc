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
exports.AuthenticateUserUseCase = void 0;
const bcrypt_1 = require("bcrypt");
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const tsyringe_1 = require("tsyringe");
const auth_1 = __importDefault(require("../../shared/config/auth"));
const AppError_1 = require("../../shared/errors/AppError");
let AuthenticateUserUseCase = class AuthenticateUserUseCase {
    constructor(userRepository, tokensUsersRepository) {
        this.userRepository = userRepository;
        this.tokensUsersRepository = tokensUsersRepository;
    }
    execute({ email, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = (yield this.userRepository.index({ email }))[0];
            const { expiresInToken, secretToken, secretRefreshToken, expiresInRefreshToken, expiresRefreshTokenDays, } = auth_1.default;
            if (!usuario) {
                throw new AppError_1.AppError('E-mail ou senha inválida!');
            }
            const senhaCorreta = yield (0, bcrypt_1.compare)(password, usuario.password);
            if (!senhaCorreta) {
                throw new AppError_1.AppError('E-mail ou senha inválida!');
            }
            const token = (0, jsonwebtoken_1.sign)({}, secretToken, {
                subject: usuario.id,
                expiresIn: expiresInToken,
            });
            const refreshToken = (0, jsonwebtoken_1.sign)({ email }, secretRefreshToken, {
                subject: usuario.id,
                expiresIn: expiresInRefreshToken,
            });
            yield this.tokensUsersRepository.create({
                expirationDate: (0, dayjs_1.default)().add(expiresRefreshTokenDays, 'days').toDate(),
                refreshToken,
                userId: usuario.id,
            });
            const tokenRetorno = {
                token,
                user: {
                    name: usuario.name,
                    email: usuario.email,
                },
                refreshToken: refreshToken,
            };
            return tokenRetorno;
        });
    }
};
AuthenticateUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UserRepository')),
    __param(1, (0, tsyringe_1.inject)('TokensUsersRepository')),
    __metadata("design:paramtypes", [Object, Object])
], AuthenticateUserUseCase);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
