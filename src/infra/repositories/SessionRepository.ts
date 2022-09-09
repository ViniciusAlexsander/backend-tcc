import { ICreateSessionDto } from 'core/domain/dtos/sessions/ICreateSessionDto';
import { ISessionRepository } from 'core/repositories/ISessionRepository';
import { Session } from 'infra/entities/Session';
import { getRepository, Repository } from 'typeorm';

export class SessionRepository implements ISessionRepository {
  private repository: Repository<Session>;

  constructor() {
    this.repository = getRepository(Session);
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

    console.log(session);

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
}
