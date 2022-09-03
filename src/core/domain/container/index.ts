import { IGroupRepository } from 'core/repositories/IGroupRepository';
import { IUserRepository } from 'core/repositories/IUserRepository';
import { GroupRepository } from 'infra/repositories/GroupRepository';
import { UserRepository } from 'infra/repositories/UserRepository';
import { container } from 'tsyringe';
import { TokensUsersRepository } from '../../../infra/repositories/TokensUsersRepository';
import { ITokensUserRepository } from '../../repositories/ITokensUsersRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ITokensUserRepository>(
  'TokensUsersRepository',
  TokensUsersRepository,
);

container.registerSingleton<IGroupRepository>(
  'GroupRepository',
  GroupRepository,
);
