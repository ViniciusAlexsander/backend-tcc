import { CreateGroupUseCase } from 'core/useCases/groups/CreateGroupUseCase';
import { Router } from 'express';
import { container } from 'tsyringe';

const groupRoutes = Router();

groupRoutes.post('/', async (req, res) => {
  const createGroupUseCase = container.resolve(CreateGroupUseCase);
  const group = req.body;

  await createGroupUseCase.execute(group);

  return res.status(201).json(group);
});

groupRoutes.get('/', async (req, res) => {});

export { groupRoutes };
