import { ICreateSessionInput } from '../../../core/ports/sessions/ICreateSessionInput';
import { IGroupRepository } from '../../../core/repositories/IGroupRepository';
import { ISessionRepository } from '../../../core/repositories/ISessionRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../shared/errors/AppError';

@injectable()
export class CreateSessionUseCase {
  constructor(
    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  async execute({
    groupId,
    movieId,
    assistedInId,
    sessionDay,
  }: ICreateSessionInput): Promise<void> {
    try {
      const group = await this.groupRepository.index({ id: groupId });
      const movieAlreadyWatched = await this.sessionRepository.index({
        movie_id: movieId,
        group_id: groupId,
      });

      if (!group) {
        throw new AppError('Group not found');
      }

      if (movieAlreadyWatched.length > 0) {
        throw new AppError('Movie already watched', 409);
      }

      // TODO: check if movie exists in TMDB

      return await this.sessionRepository.create({
        group_id: groupId,
        movie_id: movieId,
        assisted_in_id: assistedInId,
        session_day: sessionDay,
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}
