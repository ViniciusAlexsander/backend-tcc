import { JoinSessionUseCase } from 'core/useCases/session_users/JoinSessionUseCase';
import { LeaveSessionUseCase } from 'core/useCases/session_users/LeaveSessionUseCase';
import { Router } from 'express';
import { checkAuthentication } from 'presentation/middlewares/checkAuthentication';
import { container } from 'tsyringe';

const sessionUsersRoutes = Router();

sessionUsersRoutes.post('/', checkAuthentication, async (req, res) => {
  const { sessionId } = req.body;

  const userId = req.usuario.id;

  const createSessionUseCase = container.resolve(JoinSessionUseCase);
  const result = await createSessionUseCase.execute({ userId, sessionId });

  return res.status(200).json(result);
});

sessionUsersRoutes.delete(
  '/:sessionId',
  checkAuthentication,
  async (req, res) => {
    const { sessionId } = req.params;
    const userId = req.usuario.id;

    const createSessionUseCase = container.resolve(LeaveSessionUseCase);
    await createSessionUseCase.execute({ userId, sessionId });

    return res.status(200).json({ message: 'Usuário saiu da sessão' });
  },
);

export { sessionUsersRoutes };
