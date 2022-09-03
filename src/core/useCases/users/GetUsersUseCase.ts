import { IGetUserOutput } from 'core/ports/users/IGetUserOutput';
import { IUserRepository } from 'core/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../shared/errors/AppError';

@injectable()
class GetUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<IGetUserOutput[]> {
    const users = await this.userRepository.getUsers();
    console.log(users);

    const usersFormated: IGetUserOutput[] = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        userName: user.user_name,
        email: user.email,
        createdAt: user.created_at,
      };
    });

    return usersFormated;
  }
}

export { GetUsersUseCase };
