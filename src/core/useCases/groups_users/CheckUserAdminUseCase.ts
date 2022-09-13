import { ICheckUserAdminInput } from '../../../core/ports/groups_users/ICheckUserAdminInput';
import { IGroupRepository } from '../../../core/repositories/IGroupRepository';
import { IGroupsUsersRepository } from '../../../core/repositories/IGroupsUsersRepository';
import { AppError } from '../../../core/shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICheckUserAdminOutput } from 'core/ports/groups_users/ICheckUserAdminOutput';

@injectable()
class CheckUserAdminUseCase {
  constructor(
    @inject('GroupsUsersRepository')
    private groupsUsersRepository: IGroupsUsersRepository,

    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  async execute({
    groupId,
    userIdLogged,
  }: ICheckUserAdminInput): Promise<ICheckUserAdminOutput> {
    const group = await this.groupRepository.index({ id: groupId });
    const userInGroup = await this.groupsUsersRepository.findUserInGroup({
      group_id: groupId,
      user_id: userIdLogged,
    });

    if (!group) {
      throw new AppError('Grupo não existe');
    }

    if (!userInGroup) {
      throw new AppError('Usuário não está no grupo');
    }

    return {
      isAdmin: userInGroup.is_admin,
    };
  }
}

export { CheckUserAdminUseCase };
