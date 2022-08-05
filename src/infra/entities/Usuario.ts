import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("usuarios")
class Usuario {
  @PrimaryColumn()
  id: string;
  @Column()
  nome: string;
  @Column()
  email: string;
  @Column()
  senha: string;
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Usuario };
