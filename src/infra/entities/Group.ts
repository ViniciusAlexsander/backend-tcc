import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { GroupsUsers } from './GroupsUsers';

@Entity({ name: 'groups' })
class Group {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'groups_users',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @OneToMany(() => GroupsUsers, (groupsUsers) => groupsUsers.group)
  @JoinColumn({ name: 'group_id' })
  groupsUsers: GroupsUsers[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Group };
