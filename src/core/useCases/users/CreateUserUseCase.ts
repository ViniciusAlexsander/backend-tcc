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
    const emailAlreadyRegistred = await this.userRepository.index({ email });

    if (emailAlreadyRegistred.length > 0) {
      throw new AppError('Email already registred');
    }

    const userNameAlreadyRegistred = await this.userRepository.index({
      user_name: userName,
    });

    if (userNameAlreadyRegistred.length > 0) {
      throw new AppError('User name already registred');
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
