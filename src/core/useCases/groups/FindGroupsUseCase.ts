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
        users: group.users.map((relation: User) => {
          // format users in group
          return {
            id: relation.id,
            name: relation.name,
            joinedAt: this.getUserJoinedDate(relation.id, group.groupsUsers),
          };
        }),
      };
    });
  }

  getUserJoinedDate(userId: string, groupsUsers: GroupsUsers[]): Date {
    // get user joined date in group
    return groupsUsers.find((groupUser) => groupUser.user_id === userId)
      .created_at;
  }
}

export { FindGroupsUseCase };
