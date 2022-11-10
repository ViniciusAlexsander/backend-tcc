import { ICreateGroupDto } from 'core/domain/dtos/groups/ICreateGroupDto';
import { IDeleteGroupDto } from 'core/domain/dtos/groups/IDeleteGroupDto';
import { IFindGroupsDto } from 'core/domain/dtos/groups/IFindGroupsDto';
import { Group } from 'infra/entities/Group';

export interface IGroupRepository {
  index({ id, title }: IFindGroupsDto): Promise<Group[]>;
  findOne(id: string): Promise<Group>;
  createGroup({ title, description }: ICreateGroupDto): Promise<any>;
  deleteGroup({id}: IDeleteGroupDto): Promise<void>;
}
