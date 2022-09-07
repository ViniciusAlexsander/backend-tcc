import { IAddUsersToGroupsDto } from 'core/domain/dtos/groups_users/IAddUsersToGroupsDto';
import { IFindGroupsUsersDto } from 'core/domain/dtos/groups_users/IFindGroupsUsersDto';
import { IGetGroupsUsersDto } from 'core/domain/dtos/groups_users/IGetGroupsUsersDto';
import { IGroupsUsersRepository } from 'core/repositories/IGroupsUsersRepository';
import { GroupsUsers } from 'infra/entities/GroupsUsers';
import { getRepository, Repository } from 'typeorm';

class GroupsUsersRepository implements IGroupsUsersRepository {
  private repository: Repository<GroupsUsers>;

  constructor() {
    this.repository = getRepository(GroupsUsers);
  }

  async index({
    group_id,
    user_id,
  }: IFindGroupsUsersDto): Promise<IGetGroupsUsersDto[]> {
    const groupsUsers = await this.repository.find({
      where: {
        ...(group_id && { group_id }),
        ...(user_id && { user_id }),
      },
      join: {
        alias: 'groups_users',
        leftJoinAndSelect: {
          groups: 'groups_users.group',
          users: 'groups_users.user',
        },
      },
    });

    return groupsUsers;
  }

  async addUserToGroup({
    user_id,
    group_id,
    is_admin,
  }: IAddUsersToGroupsDto): Promise<void> {
    const groupUser = this.repository.create({
      user_id,
      group_id,
      is_admin,
    });

    await this.repository.save(groupUser);
  }

  async findUserInGroup({
    group_id,
    user_id,
  }: IAddUsersToGroupsDto): Promise<GroupsUsers> {
    const user = await this.repository.findOne({
      group_id,
      user_id,
    });

    return user;
  }
}

export { GroupsUsersRepository };
