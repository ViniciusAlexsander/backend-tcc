import { IAddGroupToUserInput } from '../../ports/groups_users/IAddUserToGroupInput';
import { IGroupRepository } from '../../repositories/IGroupRepository';
import { IGroupsUsersRepository } from '../../repositories/IGroupsUsersRepository';
import { AppError } from '../../../core/shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class AddUserToGroupUseCase {
  constructor(
    @inject('GroupsUsersRepository')
    private groupsUsersRepository: IGroupsUsersRepository,

    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  async execute({
    groupId,
    userId,
    isAdmin,
    userIdLogged,
  }: IAddGroupToUserInput): Promise<void> {
    const group = await this.groupRepository.index({ id: groupId });
    const userAlreadyInGroup = await this.groupsUsersRepository.findUserInGroup(
      { group_id: groupId, user_id: userId },
    );
    const isUserLoggedAdmin = await this.groupsUsersRepository.index({
      group_id: groupId,
      user_id: userIdLogged,
    });
    const isUserLoggedInGroup =
      await this.groupsUsersRepository.findUserInGroup({
        group_id: groupId,
        user_id: userIdLogged,
      });

    if (!group) {
      throw new AppError('Grupo não existe');
    }

    if (!isUserLoggedInGroup) {
      throw new AppError('Usuário executando a operação não está no grupo');
    }

    if (userAlreadyInGroup) {
      throw new AppError('Usuário já está no grupo');
    }

    if (!isUserLoggedAdmin[0].is_admin) {
      throw new AppError('Usuário não é administrador');
    }

    await this.groupsUsersRepository.addUserToGroup({
      group_id: groupId,
      user_id: userId,
      is_admin: isAdmin,
    });
  }
}

export { AddUserToGroupUseCase };
