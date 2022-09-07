import { IAddUsersToGroupsDto } from 'core/domain/dtos/groups_users/IAddUsersToGroupsDto';
import { IFindUserInGroupDto } from 'core/domain/dtos/groups_users/IFindUserInGroupDto';
import { IGetGroupsUsersDto } from 'core/domain/dtos/groups_users/IGetGroupsUsersDto';

export interface IGroupsUsersRepository {
  index({
    group_id = null,
    user_id = null,
  }?: IFindUserInGroupDto): Promise<IGetGroupsUsersDto[]>;

  addUserToGroup({
    group_id,
    is_admin,
    user_id,
    user_id_logged,
  }: IAddUsersToGroupsDto): Promise<void>;

  findUserInGroup({ group_id, user_id }: IFindUserInGroupDto): Promise<any>;
}
