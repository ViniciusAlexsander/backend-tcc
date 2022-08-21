import { getRepository, Repository } from "typeorm";
import { ICriacaoUsuarioTokenDto } from "../../core/domain/dtos/UsuarioTokens/ICriacaoUsuarioTokenDto";
import { IUsuarioTokensRepository } from "../../core/repositories/IUsuarioTokensRepository";
import { UsuarioTokens } from "../entities/UsuarioTokens";

class UsuarioTokensRepository implements IUsuarioTokensRepository {
  private repository: Repository<UsuarioTokens>;

  constructor() {
    this.repository = getRepository(UsuarioTokens);
  }

  async encontrarPorUsuarioIdRefreshToken(
    usuarioId: string,
    refreshToken: string
  ): Promise<UsuarioTokens> {
    const usuarioTokens = await this.repository.findOne({
      usuario_id: usuarioId,
      refresh_token: refreshToken,
    });

    return usuarioTokens;
  }

  async excluirPorId(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async create({
    dataExpiracao,
    refreshToken,
    usuarioId,
  }: ICriacaoUsuarioTokenDto): Promise<UsuarioTokens> {
    const usuarioToken = this.repository.create({
      data_expiracao: dataExpiracao,
      refresh_token: refreshToken,
      usuario_id: usuarioId,
    });

    await this.repository.save(usuarioToken);

    return usuarioToken;
  }
}

export { UsuarioTokensRepository };
