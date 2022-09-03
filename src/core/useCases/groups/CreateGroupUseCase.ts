import { ICreateGroupInput } from 'core/ports/groups/ICreateGroupInput';
import { IGroupRepository } from 'core/repositories/IGroupRepository';
import { AppError } from 'core/shared/errors/AppError';
import { inject } from 'tsyringe';

class CreateGroupUseCase {
  constructor(
    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  async execute({ title, description }: ICreateGroupInput): Promise<void> {
    const existsGroup = await this.groupRepository.findGroupByTitle(title);

    if (existsGroup) {
      throw new AppError('Group already exists');
    }

    await this.groupRepository.createGroup({ title, description });
  }
}

export { CreateGroupUseCase };
