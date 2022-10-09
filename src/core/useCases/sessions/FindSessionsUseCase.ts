import { IFindSessionByIdOutput } from '../../../core/ports/sessions/IFindSessionByIdOutput';
import { IFindSessionsInput } from '../../../core/ports/sessions/IFindSessionsInput';
import { ISessionRepository } from '../../../core/repositories/ISessionRepository';
import { inject, injectable } from 'tsyringe';
import { IFindSessionOutput } from 'core/ports/sessions/IFindSessionOutput';

@injectable()
export class FindSessionsUseCase {
  constructor(
    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
  ) {}

  async execute({
    groupId,
    assistedInId,
    movieId,
  }: IFindSessionsInput): Promise<IFindSessionOutput[]> {
    try {
      const sessions = await this.sessionRepository.index({
        group_id: groupId,
        assisted_in_id: assistedInId,
        movie_id: movieId,
      });

      return sessions.map((session) => ({
        id: session.id,
        movieId: session.movie_id,
        groupId: session.group_id,
        assistedInId: session.assisted_in_id,
        sessionDay: session.session_day,
        createdAt: session.created_at,
        group: session.group,
        users: session.users.map((user) => {return {id: user.id, username: user.user_name}})
      }));
    } catch (error) {
      return error.message;
    }
  }
}
