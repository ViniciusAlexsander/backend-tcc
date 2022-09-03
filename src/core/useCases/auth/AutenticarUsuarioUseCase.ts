import { compare } from 'bcrypt';
import { IAuthenticateUserInput } from 'core/ports/auth/IAuthenticateUserInput';
import { IUserRepository } from 'core/repositories/IUserRepository';
import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { ITokensUserRepository } from '../../repositories/ITokensUsersRepository';
import auth from '../../shared/config/auth';
import { AppError } from '../../shared/errors/AppError';

interface IAuthenticateUserOutput {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('TokensUsersRepository')
    private tokensUsersRepository: ITokensUserRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserInput): Promise<IAuthenticateUserOutput> {
    const usuario = await this.userRepository.getUserByEmail(email);

    const {
      expiresInToken,
      secretToken,
      secretRefreshToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = auth;

    if (!usuario) {
      throw new AppError('Email ou senha invalida');
    }

    const senhaCorreta = await compare(password, usuario.password);

    if (!senhaCorreta) {
      throw new AppError('Email ou senha invalida');
    }

    const token = sign({}, secretToken, {
      subject: usuario.id,
      expiresIn: expiresInToken,
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: usuario.id,
      expiresIn: expiresInRefreshToken,
    });

    await this.tokensUsersRepository.create({
      expirationDate: dayjs().add(expiresRefreshTokenDays, 'days').toDate(),
      refreshToken,
      userId: usuario.id,
    });

    const tokenRetorno: IAuthenticateUserOutput = {
      token,
      user: {
        name: usuario.name,
        email: usuario.email,
      },
      refreshToken: refreshToken,
    };

    return tokenRetorno;
  }
}

export { AuthenticateUserUseCase };
