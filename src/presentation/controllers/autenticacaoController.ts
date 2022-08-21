import { Router, Request, Response } from "express";
import { container } from "tsyringe";
import { AutenticarUsuarioUseCase } from "../../core/useCases/autenticacao/AutenticarUsuarioUseCase";
import { RefreshTokenUseCase } from "../../core/useCases/autenticacao/RefreshTokenUseCase";
const autenticacaoRoutes = Router();

autenticacaoRoutes.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const { senha, email } = req.body;

    const autenticarUsuarioUseCase = container.resolve(
      AutenticarUsuarioUseCase
    );

    const token = await autenticarUsuarioUseCase.execute({
      email,
      senha,
    });

    return res.json(token);
  }
);

autenticacaoRoutes.post(
  "/refresh-token",
  async (req: Request, res: Response): Promise<Response> => {
    const refreshToken =
      req.body.refreshToken ||
      req.headers["x-access-token"] ||
      req.query.refreshToken;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const newRefreshToken = await refreshTokenUseCase.execute(refreshToken);

    return res.json(newRefreshToken);
  }
);

export { autenticacaoRoutes };
