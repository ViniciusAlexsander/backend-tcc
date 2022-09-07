import { ICreateGroupDto } from 'core/domain/dtos/groups/ICreateGroupDto';
import { IFindGroupDto } from 'core/domain/dtos/groups/IFindGroupDto';

export interface IGroupRepository {
  createGroup({ title, description }: ICreateGroupDto): Promise<any>;
  index({ id, title }: IFindGroupDto): Promise<IFindGroupDto[]>;
}
