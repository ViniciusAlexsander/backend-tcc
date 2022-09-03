import { ICreateUserDto } from 'core/domain/dtos/user/ICreateUserDto';
import { IGetUserByEmailDto } from 'core/domain/dtos/user/IGetUserByEmailDto';
import { IGetUsersDto } from 'core/domain/dtos/user/IGetUsersDto';

interface IUserRepository {
  createUser(user: ICreateUserDto): Promise<void>;
  getUsers(): Promise<IGetUsersDto[]>;
  getUserByEmail(email: string): Promise<IGetUserByEmailDto>;
}

export { IUserRepository };
