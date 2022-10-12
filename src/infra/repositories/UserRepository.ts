import { ICreateUserDto } from '../../core/domain/dtos/user/ICreateUserDto';
import { IFindUsersDto } from '../../core/domain/dtos/user/IFindUsersDto';
import { User } from '../entities/User';
import { getRepository, Repository } from 'typeorm';
import { IUserRepository } from '../../core/repositories/IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async index({     
    id = null,
    user_name = null,
    email = null
  }: IFindUsersDto): Promise<User[]> {
    const users = await this.repository.find({
      where: {
        ...(id && { id }),
        ...(user_name && { user_name }),
        ...(email && { email }),
      },
    });

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
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
}

export { UserRepository };
