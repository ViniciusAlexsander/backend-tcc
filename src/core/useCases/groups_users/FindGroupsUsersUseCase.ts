import { IGetGroupsUsersDto } from 'core/domain/dtos/groups_users/IGetGroupsUsersDto';
import { IFindGroupsUsersInput } from 'core/ports/groups_users/IFindGroupsUsersInput';
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
  }: IFindGroupsUsersInput): Promise<IGetGroupsUsersDto[]> {
    const groupsUsers = await this.groupsUsersRepository.index({
      group_id: groupId,
      user_id: userId,
    });

    return groupsUsers;
  }
}

export { FindGroupsUsersUseCase };
