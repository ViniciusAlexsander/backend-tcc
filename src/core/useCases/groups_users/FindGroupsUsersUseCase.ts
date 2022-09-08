import { IGetGroupsUsersDto } from 'core/domain/dtos/groups_users/IGetGroupsUsersDto';
import { IFindGroupsUsersInput } from 'core/ports/groups_users/IFindGroupsUsersInput';
import { IFindGroupsUsersOutput } from 'core/ports/groups_users/IFindGroupsUsersOutput';
import { IGroupsUsersRepository } from 'core/repositories/IGroupsUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindGroupsUsersUseCase {
  constructor(
    @inject('GroupsUsersRepository')
    private groupsUsersRepository: IGroupsUsersRepository,
  ) {}

  async execute({
    groupId,
    userId,
  }: IFindGroupsUsersInput): Promise<IFindGroupsUsersOutput[]> {
    const groupsUsers = await this.groupsUsersRepository.index({
      group_id: groupId,
      user_id: userId,
    });

    return groupsUsers.map((groupUser) => {
      return {
        groupId: groupUser.group_id,
        userId: groupUser.user_id,
        isAdmin: groupUser.is_admin,
        user: {
          id: groupUser.user.id,
          name: groupUser.user.name,
          userName: groupUser.user.user_name,
          email: groupUser.user.email,
        },
      };
    });
  }
}

export { FindGroupsUsersUseCase };
