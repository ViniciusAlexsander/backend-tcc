import { IGroupRepository } from '../../repositories/IGroupRepository';
import { IGroupsUsersRepository } from '../../repositories/IGroupsUsersRepository';
import { ISessionRepository } from '../../repositories/ISessionRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { GroupRepository } from '../../../infra/repositories/GroupRepository';
import { GroupsUsersRepository } from '../../../infra/repositories/GroupsUsersRepository';
import { SessionRepository } from '../../../infra/repositories/SessionRepository';
import { UserRepository } from '../../../infra/repositories/UserRepository';
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

container.registerSingleton<IGroupsUsersRepository>(
  'GroupsUsersRepository',
  GroupsUsersRepository,
);

container.registerSingleton<ISessionRepository>(
  'SessionRepository',
  SessionRepository,
);
