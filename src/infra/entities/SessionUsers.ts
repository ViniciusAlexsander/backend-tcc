import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { SessionUsers };
