import { ICreateUserDto } from 'core/domain/dtos/user/ICreateUserDto';
import { IFindUsersDto } from 'core/domain/dtos/user/IFindUsersDto';
import { User } from 'infra/entities/User';

interface IUserRepository {
  index({
    id,
    user_name,
    email,
  }: IFindUsersDto): Promise<User[]>;

  findOne(id: string): Promise<User>;

  createUser(user: ICreateUserDto): Promise<void>;
}

export { IUserRepository };
