import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Group } from './Group';

@Entity({ name: 'sessions' })
class Session {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  group_id: string;

  @Column()
  movie_id: string;

  @Column()
  assisted_in_id?: string;

  @Column()
  session_day: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Session };
