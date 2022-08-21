import { ICriacaoUsuarioDto } from "../domain/dtos/Usuarios/ICriacaoUsuarioDto";
import { IObterUsuarioPorEmail } from "../domain/dtos/Usuarios/IObterUsuarioPorEmail";

interface IUsuariosRepository {
  criarUsuario(usuario: ICriacaoUsuarioDto): Promise<void>;
  obterUsuarioPorEmail(email: string): Promise<IObterUsuarioPorEmail>;
}

export { IUsuariosRepository };
