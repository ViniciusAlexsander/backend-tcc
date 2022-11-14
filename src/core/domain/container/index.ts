import { container } from 'tsyringe';

import { IGroupRepository } from '../../repositories/IGroupRepository';
import { IGroupsUsersRepository } from '../../repositories/IGroupsUsersRepository';
import { ISessionRepository } from '../../repositories/ISessionRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUsersMoviesRepository } from '../../repositories/IUsersMoviesRepository';
import { ISessionUsersRepository } from '../../repositories/ISessionUsersRepository';

import { GroupRepository } from '../../../infra/repositories/GroupRepository';
import { GroupsUsersRepository } from '../../../infra/repositories/GroupsUsersRepository';
import { SessionRepository } from '../../../infra/repositories/SessionRepository';
import { UserRepository } from '../../../infra/repositories/UserRepository';
import { TokensUsersRepository } from '../../../infra/repositories/TokensUsersRepository';
import { ITokensUserRepository } from '../../repositories/ITokensUsersRepository';
import { UsersMoviesRepository } from '../../../infra/repositories/UsersMoviesRepository';
import { SessionUsersRepository } from '../../../infra/repositories/SessionUsersRepository';

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

container.registerSingleton<ISessionUsersRepository>(
  'SessionUsersRepository',
  SessionUsersRepository,
);

container.registerSingleton<IUsersMoviesRepository>(
  'UsersMoviesRepository',
  UsersMoviesRepository,
);
