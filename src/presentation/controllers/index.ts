import { Router } from "express";
import { autenticacaoRoutes } from "./autenticacaoController";
import { usuarioRoutes } from "./usuarioController";

const router = Router();

router.use("/usuarios", usuarioRoutes);
router.use("/autenticao", autenticacaoRoutes);

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

export { router };
