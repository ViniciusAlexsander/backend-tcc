import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'session' })
class Session {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  group_id: string;

  @Column()
  movie_id: string;

  @Column()
  assisted_in_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Session };
