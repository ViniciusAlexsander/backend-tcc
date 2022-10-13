import { ICreateTokenUserDto } from 'core/domain/dtos/tokensUsers/ICreateTokenUserDto';
import { TokensUsers } from 'infra/entities/TokensUsers';

export interface ITokensUserRepository {
  create({
    expirationDate,
    refreshToken,
    userId,
  }: ICreateTokenUserDto): Promise<TokensUsers>;

  findRefreshTokenByUserId(
    usuarioId: string,
    refreshToken: string,
  ): Promise<TokensUsers>;

  removeById(id: string): Promise<void>;
}
