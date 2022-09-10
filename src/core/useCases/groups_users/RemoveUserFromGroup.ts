import { IRemoveUserFromGroupInput } from 'core/ports/groups_users/IRemoveUserFromGroupInput';
import { IGroupRepository } from 'core/repositories/IGroupRepository';
import { IGroupsUsersRepository } from '../../../core/repositories/IGroupsUsersRepository';
import { AppError } from '../../../core/shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class RemoveUserFromGroupUseCase {
  constructor(
    @inject('GroupsUsersRepository')
    private groupsUsersRepository: IGroupsUsersRepository,

    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  async execute({
    groupId,
    userId,
    userIdLogged,
  }: IRemoveUserFromGroupInput): Promise<void> {
    if (!this.checkGroupExists(groupId)) {
      throw new AppError('Grupo não existe');
    }

    if (!this.checkIfUserLoggedIsInGroup(groupId, userIdLogged)) {
      throw new AppError('Usuário executando a operação não está no grupo');
    }

    if (!this.checkIfUserThatWillBeRemovedIsInGroup(groupId, userId)) {
      throw new AppError('O usuário não está no grupo');
    }

    if (!this.checkIfUserLoggedIsAdmin(groupId, userIdLogged)) {
      throw new AppError('Usuário não é administrador');
    }

    await this.groupsUsersRepository.removeUserFromGroup({
      group_id: groupId,
      user_id: userId,
    });
  }

  async checkGroupExists(groupId: string): Promise<boolean> {
    return !!(await this.groupRepository.index({ id: groupId }));
  }

  async checkIfUserLoggedIsInGroup(
    groupId: string,
    userIdLogged: string,
  ): Promise<boolean> {
    return !!(await this.groupsUsersRepository.findUserInGroup({
      group_id: groupId,
      user_id: userIdLogged,
    }));
  }

  async checkIfUserThatWillBeRemovedIsInGroup(
    groupId: string,
    userId: string,
  ): Promise<boolean> {
    return !!(await this.groupsUsersRepository.findUserInGroup({
      group_id: groupId,
      user_id: userId,
    }));
  }

  async checkIfUserLoggedIsAdmin(
    groupId: string,
    userIdLogged: string,
  ): Promise<boolean> {
    const userLogged = await this.groupsUsersRepository.index({
      group_id: groupId,
      user_id: userIdLogged,
    });

    return userLogged[0].is_admin;
  }
}

export { RemoveUserFromGroupUseCase };
