import { ICreateGroupDto } from 'core/domain/dtos/groups/ICreateGroupDto';
import { IGroupRepository } from 'core/repositories/IGroupRepository';
import { Group } from 'infra/entities/Group';
import { getRepository, Repository } from 'typeorm';

class GroupRepository implements IGroupRepository {
  private repository: Repository<Group>;

  constructor() {
    this.repository = getRepository(Group);
  }

  async createGroup({ title, description }: ICreateGroupDto): Promise<void> {
    const group = this.repository.create({
      title,
      description,
    });

    await this.repository.save(group);
  }

  async findGroupByTitle(title: string): Promise<any> {
    const group = await this.repository.findOne({
      title,
    });

    return group;
  }
}

export { GroupRepository };
