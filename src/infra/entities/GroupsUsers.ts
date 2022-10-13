import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Group } from './Group';
import { User } from './User';

@Entity({ name: 'groups_users' })
class GroupsUsers {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @Column()
  group_id: string;

  @Column({ default: false })
  is_admin: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { GroupsUsers };
