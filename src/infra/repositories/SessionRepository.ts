import { ICreateSessionDto } from '../../core/domain/dtos/sessions/ICreateSessionDto';
import { ISessionRepository } from '../../core/repositories/ISessionRepository';
import { Session } from '../entities/Session';
import { getRepository, Repository } from 'typeorm';
import { IJoinSessionDto } from 'core/domain/dtos/sessions/IJoinSessionDto';
import { SessionUsers } from 'infra/entities/SessionUsers';
import { IFindUserSessionsDto } from 'core/domain/dtos/sessions/IFindUserSessionsDto';

export class SessionRepository implements ISessionRepository {
  private repository: Repository<Session>;
  private sessionUsersRepository: Repository<SessionUsers>;

  constructor() {
    this.repository = getRepository(Session);
    this.sessionUsersRepository = getRepository(SessionUsers);
  }

  async create({
    group_id,
    movie_id,
    assisted_in_id,
  }: ICreateSessionDto): Promise<void> {
    const session = this.repository.create({
      group_id,
      movie_id,
      assisted_in_id,
    });

    await this.repository.save(session);
  }

  async index({
    group_id = null,
    assisted_in_id = null,
    movie_id = null,
  }): Promise<Session[]> {
    const sessions = await this.repository.find({
      where: {
        ...(group_id && { group_id }),
        ...(assisted_in_id && { assisted_in_id }),
        ...(movie_id && { movie_id }),
      },
      relations: ['group'],
    });

    return sessions;
  }

  async findById(id: string): Promise<Session> {
    const session = await this.repository.findOne({ id });

    return session;
  }

  async joinSession({ session_id, user_id }: IJoinSessionDto): Promise<void> {
    const sessionUsers = this.sessionUsersRepository.create({
      session_id,
      user_id,
      rating: 0,
    });

    await this.sessionUsersRepository.save(sessionUsers);
  }

  async findSessionUser({
    session_id,
    user_id,
  }: IFindUserSessionsDto): Promise<SessionUsers> {
    const sessionUsers = await this.sessionUsersRepository.findOne({
      session_id,
      user_id,
    });

    return sessionUsers;
  }
}
