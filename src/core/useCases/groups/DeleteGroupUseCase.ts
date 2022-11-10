import { IFindGroupInput } from '../../ports/groups/IFindGroupInput';
import { IFindGroupOutput } from '../../ports/groups/IFindGroupOutput';
import { IGroupRepository } from '../../repositories/IGroupRepository';
import { Group } from '../../../infra/entities/Group';
import { GroupsUsers } from '../../../infra/entities/GroupsUsers';
import { User } from '../../../infra/entities/User';
import { inject, injectable } from 'tsyringe';
import { IDeleteGroupInput } from 'core/ports/groups/IDeleteGroupInput';

@injectable()
export class DeleteGroupUseCase {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  async execute({ id }: IDeleteGroupInput) {
    const group = await this.groupRepository.findOne(id);

    if (!group) {
      throw new Error('Group not found');
    }

    await this.groupRepository.deleteGroup(id);
  }
}
