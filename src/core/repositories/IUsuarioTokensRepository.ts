import { UsuarioTokens } from "../../infra/entities/UsuarioTokens";
import { ICriacaoUsuarioTokenDto } from "../domain/dtos/UsuarioTokens/ICriacaoUsuarioTokenDto";

export interface IUsuarioTokensRepository {
  create({
    dataExpiracao,
    refreshToken,
    usuarioId,
  }: ICriacaoUsuarioTokenDto): Promise<UsuarioTokens>;

  encontrarPorUsuarioIdRefreshToken(
    usuarioId: string,
    refreshToken: string
  ): Promise<UsuarioTokens>;

  excluirPorId(id: string): Promise<void>;
}
