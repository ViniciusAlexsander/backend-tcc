import { ICreateGroupDto } from 'core/domain/dtos/groups/ICreateGroupDto';
import { IFindGroupDto } from 'core/domain/dtos/groups/IFindGroupDto';
import { IGroupRepository } from 'core/repositories/IGroupRepository';
import { Group } from 'infra/entities/Group';
import { getRepository, Repository } from 'typeorm';

class GroupRepository implements IGroupRepository {
  private repository: Repository<Group>;

  constructor() {
    this.repository = getRepository(Group);
  }

  async index({ id, title }: IFindGroupDto): Promise<IFindGroupDto[]> {
    return await this.repository.find({
      where: {
        ...(id && { id }),
        ...(title && { title }),
      },
      relations: ['users'],
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
