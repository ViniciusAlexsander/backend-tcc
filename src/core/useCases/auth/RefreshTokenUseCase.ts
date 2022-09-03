import dayjs from 'dayjs';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { ITokensUserRepository } from '../../repositories/ITokensUsersRepository';
import auth from '../../shared/config/auth';
import { AppError } from '../../shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface IRefreshTokenUseCaseOutput {
  token: string;
  expiresInToken: Date;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('TokensUsersRepository')
    private tokensUsersRepository: ITokensUserRepository,
  ) {}

  async execute(refreshToken: string): Promise<IRefreshTokenUseCaseOutput> {
    const {
      secretRefreshToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
      secretToken,
      expiresInToken,
    } = auth;
    const { email, sub } = verify(refreshToken, secretRefreshToken) as IPayload;

    const userId = sub;

    const usuarioToken =
      await this.tokensUsersRepository.findRefreshTokenByUserId(
        userId,
        refreshToken,
      );

    if (!usuarioToken) {
      throw new AppError('Refresh token não existe');
    }

    if (dayjs().isAfter(usuarioToken.expiration_date)) {
      await this.tokensUsersRepository.removeById(usuarioToken.id);
      throw new AppError(
        'Refresh token expirou, por favor crie uma nova sessão',
      );
    }

    await this.tokensUsersRepository.removeById(usuarioToken.id);

    const novoRefreshToken = sign({ email }, secretRefreshToken, {
      subject: userId,
      expiresIn: expiresInRefreshToken,
    });

    await this.tokensUsersRepository.create({
      expirationDate: dayjs().add(expiresRefreshTokenDays, 'days').toDate(),
      refreshToken: novoRefreshToken,
      userId: userId,
    });

    const token = sign({}, secretToken, {
      subject: userId,
      expiresIn: expiresInToken,
    });

    return {
      token,
      expiresInToken: dayjs().add(15, 'minute').toDate(),
      refreshToken: novoRefreshToken,
    };
  }
}

export { RefreshTokenUseCase };
