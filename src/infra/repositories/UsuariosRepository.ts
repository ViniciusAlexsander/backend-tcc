import { ICriacaoUsuarioDto } from "core/domain/dtos/Usuarios/ICriacaoUsuarioDto";
import { IObterUsuarioPorEmail } from "core/domain/dtos/Usuarios/IObterUsuarioPorEmail";
import { IUsuariosRepository } from "core/repositories/IUsuariosRepository";
import { Usuario } from "infra/entities/Usuario";
import { getRepository, Repository } from "typeorm";

class UsuariosRepository implements IUsuariosRepository {
  private repository: Repository<Usuario>;

  constructor() {
    this.repository = getRepository(Usuario);
  }

  async criarUsuario({
    email,
    senha,
    nome,
  }: ICriacaoUsuarioDto): Promise<void> {
    const usuario = this.repository.create({ nome, email, senha });

    await this.repository.save(usuario);
  }

  async obterUsuarioPorEmail(email: string): Promise<IObterUsuarioPorEmail> {
    const usuario = await this.repository.findOne({
      email,
    });

    return { ...usuario };
  }
}

export { UsuariosRepository };
