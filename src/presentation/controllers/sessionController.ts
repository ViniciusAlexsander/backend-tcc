import { ICreateSessionInput } from '../../core/ports/sessions/ICreateSessionInput';
import { IFindSessionsInput } from '../../core/ports/sessions/IFindSessionsInput';
import { CreateSessionUseCase } from '../../core/useCases/sessions/CreateSessionUseCase';
import { FindSessionByIdUseCase } from '../../core/useCases/sessions/FindByIdSessionUseCase';
import { FindSessionsUseCase } from '../../core/useCases/sessions/FindSessionsUseCase';
import { Router } from 'express';
import { container } from 'tsyringe';
import { checkAuthentication } from '../middlewares/checkAuthentication';
import { JoinSessionUseCase } from '../../core/useCases/sessions/JoinSessionUseCase';
import { DeleteSessionUseCase } from '../../core/useCases/sessions/DeleteSessionUseCase';

export const sessionRoutes = Router();

sessionRoutes.post('/', checkAuthentication, async (req, res) => {
  const { groupId, movieId, assistedInId, sessionDay }: ICreateSessionInput =
    req.body;

  const createSessionUseCase = container.resolve(CreateSessionUseCase);
  const result = await createSessionUseCase.execute({
    groupId,
    movieId,
    assistedInId,
    sessionDay,
  });

  return res.status(201).json(result);
});

sessionRoutes.get('/', checkAuthentication, async (req, res) => {
  const data: IFindSessionsInput = {
    groupId: req.query.groupId as string,
    movieId: req.query.movieId as string,
    assistedInId: req.query.assistedInId as string,
  };

  const findSessionsUseCase = container.resolve(FindSessionsUseCase);
  const result = await findSessionsUseCase.execute(data);

  return res.status(200).json(result);
});

sessionRoutes.get('/:id', checkAuthentication, async (req, res) => {
  const { id } = req.params;

  const createSessionUseCase = container.resolve(FindSessionByIdUseCase);
  const result = await createSessionUseCase.execute(id);

  return res.status(200).json(result);
});

sessionRoutes.post('/join', checkAuthentication, async (req, res) => {
  const { sessionId } = req.body;

  const userId = req.usuario.id;

  const createSessionUseCase = container.resolve(JoinSessionUseCase);
  const result = await createSessionUseCase.execute({ userId, sessionId });

  return res.status(200).json(result);
});

sessionRoutes.delete('/:id', checkAuthentication, async (req, res) => {
  const { id } = req.params;

  const createSessionUseCase = container.resolve(DeleteSessionUseCase);
  const result = await createSessionUseCase.execute(id);

  return res.status(200).json(result);
});
