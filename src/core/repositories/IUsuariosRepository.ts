import { ICriacaoUsuarioDto } from "core/domain/dtos/Usuarios/ICriacaoUsuarioDto";
import { IObterUsuarioPorEmail } from "core/domain/dtos/Usuarios/IObterUsuarioPorEmail";

interface IUsuariosRepository {
  criarUsuario(usuario: ICriacaoUsuarioDto): Promise<void>;
  obterUsuarioPorEmail(email: string): Promise<IObterUsuarioPorEmail>;
}

export { IUsuariosRepository };
