import { ICreateSessionInput } from '../../../core/ports/sessions/ICreateSessionInput';
import { IGroupRepository } from '../../../core/repositories/IGroupRepository';
import { ISessionRepository } from '../../../core/repositories/ISessionRepository';
import { inject, injectable } from 'tsyringe';

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
  }: ICreateSessionInput): Promise<void> {
    try {
      const group = await this.groupRepository.index({ id: groupId });

      if (!group) {
        throw new Error('Group not found');
      }

      // TODO: check if movie exists in TMDB

      return await this.sessionRepository.create({
        group_id: groupId,
        movie_id: movieId,
        assisted_in_id: assistedInId,
      });
    } catch (error) {
      return error.message;
    }
  }
}
