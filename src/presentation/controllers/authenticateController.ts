import { IAuthenticateUserInput } from 'core/ports/auth/IAuthenticateUserInput';
import { AuthenticateUserUseCase } from 'core/useCases/auth/AutenticarUsuarioUseCase';
import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from '../../core/useCases/auth/RefreshTokenUseCase';
const authRoutes = Router();

authRoutes.post('/', async (req: Request, res: Response): Promise<Response> => {
  const { password, email }: IAuthenticateUserInput = req.body;

  const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

  const token = await authenticateUserUseCase.execute({
    email,
    password,
  });

  return res.json(token);
});

authRoutes.post(
  '/refresh-token',
  async (req: Request, res: Response): Promise<Response> => {
    const refreshToken =
      req.body.refreshToken ||
      req.headers['x-access-token'] ||
      req.query.refreshToken;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const newRefreshToken = await refreshTokenUseCase.execute(refreshToken);

    return res.json(newRefreshToken);
  },
);

export { authRoutes };
