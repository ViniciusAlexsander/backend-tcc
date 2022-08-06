import { Router, Request, Response } from "express";
import { verificarAutenticacao } from "presentation/middlewares/verificarAutenticacao";
import { container } from "tsyringe";
import { CriacaoUsuarioUseCase } from "../../core/useCases/usuarios/CriacaoUsuarioUseCase";
const usuarioRoutes = Router();

usuarioRoutes.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const { nome, email, senha } = req.body;
    const criacaoUsuarioUseCase = container.resolve(CriacaoUsuarioUseCase);

    await criacaoUsuarioUseCase.execute({
      nome,
      email,
      senha,
    });

    return res.status(201).send();
  }
);

usuarioRoutes.get(
  "/",
  verificarAutenticacao,
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(201).json("Vai tomar no esquilo");
  }
);

export { usuarioRoutes };
