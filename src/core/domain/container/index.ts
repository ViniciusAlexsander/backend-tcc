import { IUsuariosRepository } from "core/repositories/IUsuariosRepository";
import { UsuariosRepository } from "infra/repositories/UsuariosRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsuariosRepository>(
  "UsuariosRepository",
  UsuariosRepository
);
