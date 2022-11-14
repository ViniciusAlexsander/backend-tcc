import { inject, injectable } from 'tsyringe';
import { IGroupRepository } from '../../repositories/IGroupRepository';
import { IDeleteGroupInput } from '../../../core/ports/groups/IDeleteGroupInput';

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

    await this.groupRepository.deleteGroup({id});
  }
}
