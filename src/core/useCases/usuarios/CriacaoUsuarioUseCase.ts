import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { ICriacaoUsuarioInput } from "../../ports/usuarios/ICriacaoUsuarioInput";
import { IUsuariosRepository } from "../../repositories/IUsuariosRepository";
import { AppError } from "../../shared/errors/AppError";

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

    if (usuarioExiste.id) {
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
