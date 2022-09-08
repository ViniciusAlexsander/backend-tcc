import { IFindUsersInput } from 'core/ports/users/IFindUsersInput';
import { IFindUsersOutput as IFindUsersOutput } from 'core/ports/users/IFindUsersOutput';
import { IUserRepository } from 'core/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    id,
    userName,
    email,
  }: IFindUsersInput): Promise<IFindUsersOutput[] | IFindUsersOutput> {
    const users = await this.userRepository.index({
      id,
      user_name: userName,
      email,
    });

    if (Array.isArray(users)) {
      return users.map((user) => this.formatUser(user));
    }
    return this.formatUser(users);
  }

  formatUser(user: any): IFindUsersOutput {
    return {
      id: user.id,
      name: user.name,
      userName: user.user_name,
      email: user.email,
      createdAt: user.created_at,
    };
  }
}

export { FindUsersUseCase };
