import { Router } from "express";
import { autenticacaoRoutes } from "./autenticacaoController";
import { usuarioRoutes } from "./usuarioController";

const router = Router();

router.use("/usuarios", usuarioRoutes);
router.use("/autenticao", autenticacaoRoutes);

export { router };
