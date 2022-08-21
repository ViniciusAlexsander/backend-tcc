import { compare } from "bcrypt";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsuariosRepository } from "../../repositories/IUsuariosRepository";
import { IUsuarioTokensRepository } from "../../repositories/IUsuarioTokensRepository";
import auth from "../../shared/config/auth";
import { AppError } from "../../shared/errors/AppError";

interface IAutenticarUsuarioInput {
  email: string;
  senha: string;
}

interface IAutenticarUsuarioOutput {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AutenticarUsuarioUseCase {
  constructor(
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository,
    @inject("UsuarioTokensRepository")
    private usuarioTokensRepository: IUsuarioTokensRepository
  ) {}

  async execute({
    email,
    senha,
  }: IAutenticarUsuarioInput): Promise<IAutenticarUsuarioOutput> {
    const usuario = await this.usuariosRepository.obterUsuarioPorEmail(email);

    const {
      expiresInToken,
      secretToken,
      secretRefreshToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = auth;

    if (!usuario) {
      throw new AppError("Email ou senha invalida");
    }

    const senhaCorreta = await compare(senha, usuario.senha);

    if (!senhaCorreta) {
      throw new AppError("Email ou senha invalida");
    }

    const token = sign({}, secretToken, {
      subject: usuario.id,
      expiresIn: expiresInToken,
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: usuario.id,
      expiresIn: expiresInRefreshToken,
    });

    await this.usuarioTokensRepository.create({
      dataExpiracao: dayjs().add(expiresRefreshTokenDays, "days").toDate(),
      refreshToken,
      usuarioId: usuario.id,
    });

    const tokenRetorno: IAutenticarUsuarioOutput = {
      token,
      user: {
        name: usuario.nome,
        email: usuario.email,
      },
      refreshToken: refreshToken,
    };

    return tokenRetorno;
  }
}

export { AutenticarUsuarioUseCase };
