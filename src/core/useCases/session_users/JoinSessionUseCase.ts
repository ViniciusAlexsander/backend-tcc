import { ISessionRepository } from '../../../core/repositories/ISessionRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../shared/errors/AppError';
import { ISessionUsersRepository } from '../../../core/repositories/ISessionUsersRepository';
import { IJoinSessionInput } from '../../../core/ports/session_users/IJoinSessionInput';

@injectable()
export class JoinSessionUseCase {
  constructor(
    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
    @inject('SessionUsersRepository')
    private sessionUsersRepository: ISessionUsersRepository,
  ) {}

  async execute({ sessionId, userId }: IJoinSessionInput): Promise<void> {
    try {
      const session = await this.sessionRepository.findById(sessionId);

      if (!session) {
        throw new AppError('Session not found');
      }

      const findUserInSession = await this.sessionRepository.findSessionUser({
        user_id: userId,
        session_id: sessionId,
      });

      if (findUserInSession) {
        throw new AppError('User already in session');
      }

      return await this.sessionUsersRepository.joinSession({
        user_id: userId,
        session_id: sessionId,
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}
