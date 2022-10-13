import { Group } from 'infra/entities/Group';

export interface IFindSessionOutput {
  id: string;
  groupId: string;
  movieId: string;
  assistedInId: string;
  sessionDay: Date;
  createdAt: Date;
  group: Group;
  users: IUser[]
}

interface IUser {
  id: string;
  username: string;
}
