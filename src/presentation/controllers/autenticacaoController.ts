import { AutenticarUsuarioUseCase } from "core/useCases/autenticacao/AutenticarUsuarioUseCase";
import { RefreshTokenUseCase } from "core/useCases/autenticacao/RefreshTokenUseCase";
import { Router, Request, Response } from "express";
import { container } from "tsyringe";
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
    const token =
      req.body.token || req.headers["x-access-token"] || req.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refreshToken = await refreshTokenUseCase.execute(token);

    return res.json(refreshToken);
  }
);

export { autenticacaoRoutes };
