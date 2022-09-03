import { hash } from 'bcrypt';
import { ICreateUserInput } from 'core/ports/users/ICreateUserInput';
import { IUserRepository } from 'core/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    email,
    name,
    userName,
    password,
  }: ICreateUserInput): Promise<void> {
    const existsUser = await this.userRepository.getUserByEmail(email);

    if (existsUser.id) {
      throw new AppError('Usuário ja existe');
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.createUser({
      name,
      user_name: userName,
      password: passwordHash,
      email,
    });
  }
}

export { CreateUserUseCase };
