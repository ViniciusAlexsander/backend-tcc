import { IFindSessionByIdOutput } from '../../../core/ports/sessions/IFindSessionByIdOutput';
import { ISessionRepository } from '../../../core/repositories/ISessionRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteSessionUseCase {
  constructor(
    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
  ) {}

  async execute(id: string): Promise<IFindSessionByIdOutput> {
    try {
      const session = await this.sessionRepository.findById(id);
      
      if(!session) {
        throw new Error('Session not found');
      }

      await this.sessionRepository.delete({id});
      
    } catch (error) {
      return error.message;
    }
  }
}
