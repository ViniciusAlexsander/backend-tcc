import { v4 as uuidV4 } from "uuid";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Usuario } from "./Usuario";

@Entity("usuario_tokens")
class UsuarioTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  usuario_id: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @Column()
  data_expiracao: Date;

  @CreateDateColumn()
  criado_em: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UsuarioTokens };
