import { AutenticarUsuarioUseCase } from "core/useCases/usuarios/AutenticarUsuarioUseCase";
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

export { autenticacaoRoutes };
