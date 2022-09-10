import { ICreateTokenUserDto } from '../../core/domain/dtos/tokensUsers/ICreateTokenUserDto';
import { TokensUsers } from '../entities/TokensUsers';
import { getRepository, Repository } from 'typeorm';
import { ITokensUserRepository } from '../../core/repositories/ITokensUsersRepository';

class TokensUsersRepository implements ITokensUserRepository {
  private repository: Repository<TokensUsers>;

  constructor() {
    this.repository = getRepository(TokensUsers);
  }

  async findRefreshTokenByUserId(
    userId: string,
    refreshToken: string,
  ): Promise<TokensUsers> {
    const token = await this.repository.findOne({
      user_id: userId,
      refresh_token: refreshToken,
    });

    return token;
  }

  async removeById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async create({
    expirationDate,
    refreshToken,
    userId,
  }: ICreateTokenUserDto): Promise<TokensUsers> {
    const tokenUser = this.repository.create({
      expiration_date: expirationDate,
      refresh_token: refreshToken,
      user_id: userId,
    });

    await this.repository.save(tokenUser);

    return tokenUser;
  }
}

export { TokensUsersRepository };
