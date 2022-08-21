import dayjs from "dayjs";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsuarioTokensRepository } from "../../repositories/IUsuarioTokensRepository";
import auth from "../../shared/config/auth";
import { AppError } from "../../shared/errors/AppError";

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
    @inject("UsuarioTokensRepository")
    private usuarioTokensRepository: IUsuarioTokensRepository
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
      await this.usuarioTokensRepository.encontrarPorUsuarioIdRefreshToken(
        userId,
        refreshToken
      );

    if (!usuarioToken) {
      throw new AppError("Refresh token não existe");
    }

    if (dayjs().isAfter(usuarioToken.data_expiracao)) {
      await this.usuarioTokensRepository.excluirPorId(usuarioToken.id);
      throw new AppError(
        "Refresh token expirou, por favor crie uma nova sessão"
      );
    }

    await this.usuarioTokensRepository.excluirPorId(usuarioToken.id);

    const novoRefreshToken = sign({ email }, secretRefreshToken, {
      subject: userId,
      expiresIn: expiresInRefreshToken,
    });

    await this.usuarioTokensRepository.create({
      dataExpiracao: dayjs().add(expiresRefreshTokenDays, "days").toDate(),
      refreshToken: novoRefreshToken,
      usuarioId: userId,
    });

    const token = sign({}, secretToken, {
      subject: userId,
      expiresIn: expiresInToken,
    });

    return {
      token,
      expiresInToken: dayjs().add(15, "minute").toDate(),
      refreshToken: novoRefreshToken,
    };
  }
}

export { RefreshTokenUseCase };
