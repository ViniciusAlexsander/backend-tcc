import { IUserRepository } from 'core/repositories/IUserRepository';
import { UserRepository } from 'infra/repositories/UserRepository';
import { container } from 'tsyringe';
import { TokensUsersRepository } from '../../../infra/repositories/TokensUsersRepository';
import { ITokensUserRepository } from '../../repositories/ITokensUsersRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ITokensUserRepository>(
  'TokensUsersRepository',
  TokensUsersRepository,
);
