import { ICriacaoUsuarioTokenDto } from "core/domain/dtos/UsuarioTokens/ICriacaoUsuarioTokenDto";
import { IUsuarioTokensRepository } from "core/repositories/IUsuarioTokensRepository";
import { UsuarioTokens } from "infra/entities/UsuarioTokens";
import { getRepository, Repository } from "typeorm";

class UsuarioTokensRepository implements IUsuarioTokensRepository {
  private repository: Repository<UsuarioTokens>;

  constructor() {
    this.repository = getRepository(UsuarioTokens);
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
