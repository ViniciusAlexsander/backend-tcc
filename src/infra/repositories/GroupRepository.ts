import { ICreateGroupDto } from '../../core/domain/dtos/groups/ICreateGroupDto';
import { IFindGroupsDto } from '../../core/domain/dtos/groups/IFindGroupsDto';
import { IGroupRepository } from '../../core/repositories/IGroupRepository';
import { Group } from '../entities/Group';
import { getRepository, Raw, Repository } from 'typeorm';

class GroupRepository implements IGroupRepository {
  private repository: Repository<Group>;

  constructor() {
    this.repository = getRepository(Group);
  }

  async index({ id, title }: IFindGroupsDto): Promise<Group[]> {
    return await this.repository.find({
      where: {
        ...(id && { id }),
        ...(title && {
          title: Raw((alias) => `LOWER(${alias}) Like LOWER('%${title}%')`),
        }),
      },
      relations: ['users', 'groupsUsers'],
    });
  }

  async findOne(id: string): Promise<Group> {
    return await this.repository.findOne(id);
  }

  async createGroup({ title, description }: ICreateGroupDto): Promise<any> {
    const group = this.repository.create({
      title,
      description,
    });

    await this.repository.save(group);

    return group;
  }

  async deleteGroup(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { GroupRepository };
