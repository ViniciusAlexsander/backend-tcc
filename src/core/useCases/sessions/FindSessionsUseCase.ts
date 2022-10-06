import { IFindSessionByIdOutput } from '../../../core/ports/sessions/IFindSessionByIdOutput';
import { IFindSessionsInput } from '../../../core/ports/sessions/IFindSessionsInput';
import { ISessionRepository } from '../../../core/repositories/ISessionRepository';
import { inject, injectable } from 'tsyringe';

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
  }: IFindSessionsInput): Promise<IFindSessionByIdOutput[]> {
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
        createdAt: session.created_at,
      }));
    } catch (error) {
      return error.message;
    }
  }
}
