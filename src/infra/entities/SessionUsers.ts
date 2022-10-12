import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';
import { Group } from './Group';
import { Session } from './Session';

@Entity({ name: 'session_users' })
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

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Session)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { SessionUsers };
