import { getRepository, Repository } from 'typeorm';
import { IUsersMoviesRepository } from '../../core/repositories/IUsersMoviesRepository';
import { IFindAllUsersMoviesDto } from '../../core/domain/dtos/users_movies/IFindAllUsersMoviesDto';
import { UsersMovies } from '../../infra/entities/UsersMovies';
import { IFindOneUsersMoviesDto } from '../../core/domain/dtos/users_movies/IFindOneUsersMoviesDto';
import { IAddMovieToUserListDto } from '../../core/domain/dtos/users_movies/IAddMovieToUserListDto';
import { IUpdateMovieInUserListDto } from '../../core/domain/dtos/users_movies/IUpdateMovieInUserListDto';
import { IDeleteMovieFromUserListDto } from '../../core/domain/dtos/users_movies/IDeleteMovieFromUserListDto';

class UsersMoviesRepository implements IUsersMoviesRepository {
  private repository: Repository<UsersMovies>;

  constructor() {
    this.repository = getRepository(UsersMovies);
  }

  async create({ movie_id, user_id }: IAddMovieToUserListDto): Promise<void> {
    const userMovie = this.repository.create({
      user_id,
      movie_id,
    });

    await this.repository.save(userMovie);
  }

  async update({
    movie_id,
    user_id,
    watched = false,
    favorite = false,
    rating = null,
  }: IUpdateMovieInUserListDto): Promise<UsersMovies> {
    const userMovie = await this.repository.findOne({
      user_id,
      movie_id,
    });

    userMovie.watched = watched;
    userMovie.favorite = favorite;
    userMovie.rating = rating;

    return await this.repository.save(userMovie);
  }

  async delete({
    user_id,
    movie_id,
  }: IDeleteMovieFromUserListDto): Promise<void> {
    await this.repository.delete({
      user_id,
      movie_id,
    });
  }

  async findAll({ user_id }: IFindAllUsersMoviesDto): Promise<UsersMovies[]> {
    return await this.repository.find({
      user_id,
    });
  }

  async findOne({
    movie_id,
    user_id,
  }: IFindOneUsersMoviesDto): Promise<UsersMovies> {
    return await this.repository.findOne({
      user_id,
      movie_id,
    });
  }
}

export { UsersMoviesRepository };
