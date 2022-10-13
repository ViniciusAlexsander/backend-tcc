import { IFindUserOutput } from '../../../core/ports/users/IFindUserOutput';
import { IFindUserInput } from '../../../core/ports/users/IFindUserInput';
import { IUserRepository } from '../../../core/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ id }: IFindUserInput): Promise<IFindUserOutput> {
    const users = await this.userRepository.index({
      id,
    });

    return this.formatUser(users[0]);
  }

  formatUser(user: any): IFindUserOutput {
    return {
      id: user.id,
      name: user.name,
      userName: user.user_name,
      email: user.email,
      createdAt: user.created_at,
    };
  }
}

export { FindUserUseCase };
