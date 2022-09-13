import { IAddUsersToGroupsDto } from 'core/domain/dtos/groups_users/IAddUsersToGroupsDto';
import { IFindUserInGroupDto } from 'core/domain/dtos/groups_users/IFindUserInGroupDto';
import { IRemoveUserFromGroupDto } from 'core/domain/dtos/groups_users/IRemoveUserFromGroupDto';
import { GroupsUsers } from 'infra/entities/GroupsUsers';

export interface IGroupsUsersRepository {
  index({
    group_id = null,
    user_id = null,
  }?: IFindUserInGroupDto): Promise<GroupsUsers[]>;

  addUserToGroup({
    group_id,
    is_admin,
    user_id,
  }: IAddUsersToGroupsDto): Promise<void>;

  findUserInGroup({
    group_id,
    user_id,
  }: IFindUserInGroupDto): Promise<GroupsUsers>;

  removeUserFromGroup({
    group_id,
    user_id,
  }: IRemoveUserFromGroupDto): Promise<void>;
}
