import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users_sessions' })
class SessionUsers {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  session_id: string;

  @Column()
  user_id: string;

  @Column()
  rating: number;

  // @Column()
  // feedback: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { SessionUsers };
