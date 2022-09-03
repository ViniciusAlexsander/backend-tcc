import { CreateGroupUseCase } from 'core/useCases/groups/CreateGroupUseCase';
import { Router } from 'express';
import { container } from 'tsyringe';

const groupRoutes = Router();

groupRoutes.post('/', async (req, res) => {
  const createGroupUseCase = container.resolve(CreateGroupUseCase);

  await createGroupUseCase.execute({
    ...req.body,
  });

  return res.status(201).send();
});

groupRoutes.get('/', async (req, res) => {});
