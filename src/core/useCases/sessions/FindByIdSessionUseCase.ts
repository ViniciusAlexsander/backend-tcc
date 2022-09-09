import { IFindSessionByIdOutput } from 'core/ports/sessions/IFindSessionByIdOutput';
import { ISessionRepository } from 'core/repositories/ISessionRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindSessionByIdUseCase {
  constructor(
    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
  ) {}

  async execute(id: string): Promise<IFindSessionByIdOutput> {
    try {
      const session = await this.sessionRepository.findById(id);

      return {
        id: session.id,
        movieId: session.movie_id,
        groupId: session.group_id,
        assistedInId: session.assisted_in_id,
        createdAt: session.created_at,
      };
    } catch (error) {
      return error.message;
    }
  }
}
