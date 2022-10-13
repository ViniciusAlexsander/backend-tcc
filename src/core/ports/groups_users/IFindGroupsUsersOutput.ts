import { User } from 'infra/entities/User';

export interface IFindGroupsUsersOutput {
  groupId: string;
  userId: string;
  isAdmin: boolean;
  user: {
    id: string;
    name: string;
    userName: string;
    email: string;
  };
}
