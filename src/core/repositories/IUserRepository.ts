import { ICreateUserDto } from 'core/domain/dtos/user/ICreateUserDto';
import { IFindUsersDto } from 'core/domain/dtos/user/IFindUsersDto';
import { User } from 'infra/entities/User';

interface IUserRepository {
  index({
    id = null,
    user_name = null,
    email = null,
  }: IFindUsersDto): Promise<User[]>;

  findOne(id: string): Promise<User>;

  createUser(user: ICreateUserDto): Promise<void>;
}

export { IUserRepository };
