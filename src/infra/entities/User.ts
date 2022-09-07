import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './Group';
import { GroupsUsers } from './GroupsUsers';

@Entity({ name: 'users' })
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  user_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  description?: string;

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'groups_users',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: Group[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
