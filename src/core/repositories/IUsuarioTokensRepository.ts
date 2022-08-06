import { ICriacaoUsuarioTokenDto } from "core/domain/dtos/UsuarioTokens/ICriacaoUsuarioTokenDto";
import { UsuarioTokens } from "infra/entities/UsuarioTokens";

export interface IUsuarioTokensRepository {
  create({
    dataExpiracao,
    refreshToken,
    usuarioId,
  }: ICriacaoUsuarioTokenDto): Promise<UsuarioTokens>;
}
