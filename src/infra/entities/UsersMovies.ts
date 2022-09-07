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

@Entity({ name: 'users_movies' })
class UsersMovies {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  movie_id: string;

  @Column()
  user_id: string;

  @Column()
  rating: number;

  @Column()
  watched: boolean;

  @Column()
  favorite: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UsersMovies };
