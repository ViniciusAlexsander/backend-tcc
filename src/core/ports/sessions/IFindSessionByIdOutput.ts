import { Group } from 'infra/entities/Group';

export interface IFindSessionByIdOutput {
  id: string;
  groupId: string;
  movieId: string;
  assistedInId: string;
  sessionDay: Date;
  createdAt: Date;
  group: Group;
}
