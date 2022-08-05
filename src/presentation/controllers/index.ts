import { Router } from "express";
import { usuarioRoutes } from "./usuarioController";

const router = Router();

router.use("/usuarios", usuarioRoutes);

export { router };
