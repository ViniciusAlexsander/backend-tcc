import { User } from 'infra/entities/User';

export class IGetGroupsUsersDto {
  group_id?: string;
  user_id?: string;
  is_admin?: boolean;
  user: User;
}
