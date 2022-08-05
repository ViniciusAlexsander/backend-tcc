import { hash } from "bcrypt";
import { ICriacaoUsuarioInput } from "core/ports/usuarios/ICriacaoUsuarioInput";
import { IUsuariosRepository } from "core/repositories/IUsuariosRepository";
import { AppError } from "core/shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CriacaoUsuarioUseCase {
  constructor(
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuariosRepository
  ) {}

  async execute({ email, nome, senha }: ICriacaoUsuarioInput): Promise<void> {
    const usuarioExiste = await this.usuariosRepository.obterUsuarioPorEmail(
      email
    );

    if (usuarioExiste) {
      throw new AppError("Usuário ja existe");
    }

    const senhaHash = await hash(senha, 8);

    await this.usuariosRepository.criarUsuario({
      nome,
      senha: senhaHash,
      email,
    });
  }
}

export { CriacaoUsuarioUseCase };
