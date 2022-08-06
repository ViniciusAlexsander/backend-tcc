import { IUsuariosRepository } from "core/repositories/IUsuariosRepository";
import { IUsuarioTokensRepository } from "core/repositories/IUsuarioTokensRepository";
import { UsuariosRepository } from "infra/repositories/UsuariosRepository";
import { UsuarioTokensRepository } from "infra/repositories/UsuarioTokensRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsuariosRepository>(
  "UsuariosRepository",
  UsuariosRepository
);

container.registerSingleton<IUsuarioTokensRepository>(
  "UsuarioTokensRepository",
  UsuarioTokensRepository
);
