import { ICreateGroupDto } from 'core/domain/dtos/groups/ICreateGroupDto';
import { IFindGroupsDto } from 'core/domain/dtos/groups/IFindGroupsDto';
import { IGroupRepository } from 'core/repositories/IGroupRepository';
import { Group } from 'infra/entities/Group';
import { getRepository, Repository } from 'typeorm';

class GroupRepository implements IGroupRepository {
  private repository: Repository<Group>;

  constructor() {
    this.repository = getRepository(Group);
  }

  async index({ id, title }: IFindGroupsDto): Promise<Group[]> {
    return await this.repository.find({
      where: {
        ...(id && { id }),
        ...(title && { title }),
      },
      relations: ['users', 'groupsUsers'],
    });
  }

  async createGroup({ title, description }: ICreateGroupDto): Promise<any> {
    const group = this.repository.create({
      title,
      description,
    });

    await this.repository.save(group);

    return group;
  }
}

export { GroupRepository };
