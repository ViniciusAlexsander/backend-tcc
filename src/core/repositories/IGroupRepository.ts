import { ICreateGroupDto } from 'core/domain/dtos/groups/ICreateGroupDto';
import { IFindGroupsDto } from 'core/domain/dtos/groups/IFindGroupsDto';
import { Group } from 'infra/entities/Group';

export interface IGroupRepository {
  index({ id, title }: IFindGroupsDto): Promise<Group[]>;
  findOne(id: string): Promise<Group>;
  createGroup({ title, description }: ICreateGroupDto): Promise<any>;
  deleteGroup(id: string): Promise<void>;
}
