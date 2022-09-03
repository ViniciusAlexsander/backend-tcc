import { ICreateUserDto } from 'core/domain/dtos/user/ICreateUserDto';
import { IGetUserByEmailDto } from 'core/domain/dtos/user/IGetUserByEmailDto';
import { IGetUsersDto } from 'core/domain/dtos/user/IGetUsersDto';
import { User } from 'infra/entities/User';
import { getRepository, Repository } from 'typeorm';
import { IUserRepository } from '../../core/repositories/IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async createUser({
    email,
    password,
    name,
    user_name,
  }: ICreateUserDto): Promise<void> {
    const usuario = this.repository.create({
      name,
      email,
      password,
      user_name,
    });

    await this.repository.save(usuario);
  }

  async getUsers(): Promise<IGetUsersDto[]> {
    const users = await this.repository.find();

    return users;
  }

  async getUserByEmail(email: string): Promise<IGetUserByEmailDto> {
    const user = await this.repository.findOne({
      email,
    });

    return { ...user };
  }
}

export { UserRepository };
