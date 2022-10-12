import { ISessionRepository } from '../../../core/repositories/ISessionRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../shared/errors/AppError';
import { IJoinSessionInput } from 'core/ports/sessions/IJoinSessionInput';

@injectable()
export class JoinSessionUseCase {
  constructor(
    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
  ) {}

  async execute({ sessionId, userId }: IJoinSessionInput): Promise<void> {
    try {
      const sessionAlreadyExists = await this.sessionRepository.findById(
        sessionId,
      );

      if (!sessionAlreadyExists) {
        throw new AppError('Session not found');
      }

      // TODO: Verificar se usuario faz parte do grupo dono da sessão

      const findSessionUserAlreadyExists =
        await this.sessionRepository.findSessionUser({
          user_id: userId,
          session_id: sessionId,
        });

      if (findSessionUserAlreadyExists) {
        throw new AppError('You already joined in this session');
      }

      return await this.sessionRepository.joinSession({
        user_id: userId,
        session_id: sessionId,
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}
