import { ICreateGroupDto } from 'core/domain/dtos/groups/ICreateGroupDto';

export interface IGroupRepository {
  createGroup(group: ICreateGroupDto): Promise<void>;
  findGroupByTitle(title: string): Promise<any>;
}
