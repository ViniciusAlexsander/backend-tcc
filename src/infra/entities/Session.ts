import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';
import { GroupsUsers } from './GroupsUsers';
import { SessionUsers } from './SessionUsers';
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

  @ManyToMany(() => User)
  @JoinTable({
    name: 'session_users',
    joinColumn: {
      name: 'session_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @OneToMany(() => SessionUsers, (sessionUsers) => sessionUsers.session)
  @JoinColumn({ name: 'session_id' })
  sessionUsers: SessionUsers[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Session };
