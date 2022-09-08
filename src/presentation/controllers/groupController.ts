import { IFindGroupInput } from 'core/ports/groups/IFindGroupInput';
import { CreateGroupUseCase } from 'core/useCases/groups/CreateGroupUseCase';
import { Router } from 'express';
import { GroupRepository } from 'infra/repositories/GroupRepository';
import { checkAuthentication } from 'presentation/middlewares/checkAuthentication';
import { container } from 'tsyringe';

const groupRoutes = Router();

groupRoutes.post('/', checkAuthentication, async (req, res) => {
  const createGroupUseCase = container.resolve(CreateGroupUseCase);
  const { title, description } = req.body;
  const { id } = req.usuario;

  await createGroupUseCase.execute({
    title,
    description,
    userId: id,
  });

  return res.status(201).json({ message: 'Group created' });
});

groupRoutes.get('/', async (req, res) => {
  const groupRepository = container.resolve(GroupRepository);
  const { id, title }: IFindGroupInput = req.query;

  const group = await groupRepository.index({ id, title });

  return res.status(200).json(group);
});

export { groupRoutes };
