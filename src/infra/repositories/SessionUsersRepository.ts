import { getRepository, Repository } from 'typeorm';
import { IJoinSessionDto } from '../../core/domain/dtos/session_users/IJoinSessionDto';
import { SessionUsers } from '../../infra/entities/SessionUsers';
import { ISessionUsersRepository } from '../../core/repositories/ISessionUsersRepository';
import { ILeaveSessionDto } from '../../core/domain/dtos/session_users/ILeaveSessionDto';

export class SessionUsersRepository implements ISessionUsersRepository {
  private repository: Repository<SessionUsers>;

  constructor() {
    this.repository = getRepository(SessionUsers);
  }

  async joinSession({ session_id, user_id }: IJoinSessionDto): Promise<void> {
    const sessionUsers = this.repository.create({
      session_id,
      user_id,
      rating: 0,
    });

    await this.repository.save(sessionUsers);
  }

  async leaveSession({ session_id, user_id }: ILeaveSessionDto): Promise<void> {
    await this.repository.delete({ session_id, user_id });
  }
}
