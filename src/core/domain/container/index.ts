import { container } from "tsyringe";
import { UsuariosRepository } from "../../../infra/repositories/UsuariosRepository";
import { UsuarioTokensRepository } from "../../../infra/repositories/UsuarioTokensRepository";
import { IUsuariosRepository } from "../../repositories/IUsuariosRepository";
import { IUsuarioTokensRepository } from "../../repositories/IUsuarioTokensRepository";

container.registerSingleton<IUsuariosRepository>(
  "UsuariosRepository",
  UsuariosRepository
);

container.registerSingleton<IUsuarioTokensRepository>(
  "UsuarioTokensRepository",
  UsuarioTokensRepository
);
