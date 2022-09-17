import { v4 as uuidV4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'users_movies' })
class UsersMovies {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @Column()
  movie_id: string;

  @Column()
  rating: number;

  @Column({ default: false })
  watched: boolean;

  @Column({ default: false })
  favorite: boolean;

  @OneToOne(() => User)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UsersMovies };
