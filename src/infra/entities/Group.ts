import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('groups')
class Group {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Group };
