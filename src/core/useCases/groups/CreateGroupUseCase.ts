import { ICreateGroupInput } from 'core/ports/groups/ICreateGroupInput';
import { IGroupRepository } from 'core/repositories/IGroupRepository';
import { IGroupsUsersRepository } from 'core/repositories/IGroupsUsersRepository';
import { AppError } from 'core/shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateGroupUseCase {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
    @inject('GroupsUsersRepository')
    private groupsUsersRepository: IGroupsUsersRepository,
  ) {}

  async execute({
    title,
    description,
    userId,
  }: ICreateGroupInput): Promise<void> {
    const existsGroup = await this.groupRepository.index({ title });

    if (existsGroup.length > 0) {
      throw new AppError('Group already exists');
    }

    const groupCreated = await this.groupRepository.createGroup({
      title,
      description,
    });

    // add the first user as an administrator
    this.groupsUsersRepository.addUserToGroup({
      user_id: userId,
      group_id: groupCreated.id,
      is_admin: true,
    });
  }
}

export { CreateGroupUseCase };
