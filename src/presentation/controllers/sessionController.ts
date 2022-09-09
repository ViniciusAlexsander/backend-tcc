import { ICreateSessionInput } from 'core/ports/sessions/ICreateSessionInput';
import { IFindSessionsInput } from 'core/ports/sessions/IFindSessionsInput';
import { CreateSessionUseCase } from 'core/useCases/sessions/CreateSessionUseCase';
import { FindSessionByIdUseCase } from 'core/useCases/sessions/FindByIdSessionUseCase';
import { FindSessionsUseCase } from 'core/useCases/sessions/FindSessionsUseCase';
import { Router } from 'express';
import { container } from 'tsyringe';

export const sessionRoutes = Router();

sessionRoutes.post('/', async (req, res) => {
  const data: ICreateSessionInput = {
    groupId: req.query.groupId as string,
    movieId: req.query.movieId as string,
    assistedInId: req.query.assistedInId as string,
  };

  const createSessionUseCase = container.resolve(CreateSessionUseCase);
  const result = await createSessionUseCase.execute(data);

  return res.status(201).json(result);
});

sessionRoutes.get('/', async (req, res) => {
  const data: IFindSessionsInput = {
    groupId: req.query.groupId as string,
    movieId: req.query.movieId as string,
    assistedInId: req.query.assistedInId as string,
  };

  const findSessionsUseCase = container.resolve(FindSessionsUseCase);
  const result = await findSessionsUseCase.execute(data);
  return res.status(200).json(result);
});

sessionRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;

  const createSessionUseCase = container.resolve(FindSessionByIdUseCase);
  const result = await createSessionUseCase.execute(id);

  return res.status(200).json(result);
});
