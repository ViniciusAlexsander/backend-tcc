import { ICreateGroupInput } from 'core/ports/groups/ICreateGroupInput';
import { IFindGroupInput } from 'core/ports/groups/IFindGroupInput';
import { IFindGroupOutput } from 'core/ports/groups/IFindGroupOutput';
import { IGroupRepository } from 'core/repositories/IGroupRepository';
import { Group } from 'infra/entities/Group';
import { GroupsUsers } from 'infra/entities/GroupsUsers';
import { User } from 'infra/entities/User';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindGroupsUseCase {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  async execute({
    id,
    title,
    isMember,
    idUserLogged,
  }: IFindGroupInput): Promise<IFindGroupOutput[]> {
    const groups = await this.groupRepository.index({
      id,
      title,
    });

    if (isMember) {
      // if isMember is true, filter groups where user is member
      return this.formatGroup(
        groups.filter((group) =>
          group.users.find((user) => user.id === idUserLogged),
        ),
      );
    }

    return this.formatGroup(groups);
  }

  formatGroup(groups: Group[]): IFindGroupOutput[] {
    return groups.map((group: Group) => {
      return {
        id: group.id,
        title: group.title,
        description: group.description,
        users: group.users.map((user: User) => {
          const { joinedAt, isAdmin } = this.getUserInGroupData(
            user.id,
            group.groupsUsers,
          );
          // format users in group
          return {
            id: user.id,
            name: user.name,
            isAdmin,
            joinedAt,
          };
        }),
      };
    });
  }

  getUserInGroupData(
    userId: string,
    groupsUsers: GroupsUsers[],
  ): { joinedAt: Date; isAdmin: boolean } {
    // get user joined date in group
    const user = groupsUsers.find((groupUser) => groupUser.user_id === userId);
    return {
      joinedAt: user.created_at,
      isAdmin: user.is_admin,
    };
  }
}

export { FindGroupsUseCase };
