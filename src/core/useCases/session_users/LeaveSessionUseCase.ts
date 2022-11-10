import { ISessionRepository } from '../../repositories/ISessionRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../shared/errors/AppError';
import { ISessionUsersRepository } from '../../../core/repositories/ISessionUsersRepository';
import { ILeaveSessionInput } from 'core/ports/session_users/ILeaveSessionInput';

@injectable()
export class LeaveSessionUseCase {
  constructor(
    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
    @inject('SessionUsersRepository')
    private sessionUsersRepository: ISessionUsersRepository,
  ) {}

  async execute({ sessionId, userId }: ILeaveSessionInput): Promise<void> {
    try {
      const session = await this.sessionRepository.findById(sessionId);

      if (!session) {
        throw new AppError('Session not found');
      }

      return await this.sessionUsersRepository.leaveSession({
        user_id: userId,
        session_id: sessionId,
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}
