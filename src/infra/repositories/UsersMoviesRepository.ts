import { getRepository, IsNull, Not, Repository } from 'typeorm';
import { IUsersMoviesRepository } from '../../core/repositories/IUsersMoviesRepository';
import { IIndexUsersMoviesDto } from '../../core/domain/dtos/users_movies/IIndexUsersMoviesDto';
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

  async create({
    movie_id,
    user_id,
    watched,
  }: IAddMovieToUserListDto): Promise<UsersMovies> {
    const userMovie = this.repository.create({
      user_id,
      movie_id,
      watched,
    });

    return await this.repository.save(userMovie);
  }

  async update({
    movie_id,
    user_id,
    watched,
    favorite,
    rating,
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

  async index({
    user_id,
    watched,
    favorite,
  }: IIndexUsersMoviesDto): Promise<UsersMovies[]> {
    const favoriteAndWatchedNullCondition = watched === null && favorite !== null;
    
    return await this.repository.find({
      where: {
        user_id,
        ...(!favoriteAndWatchedNullCondition && { watched: Not(IsNull()) }),
        ...(watched && { watched }),
        ...(watched === false && { watched }),
        ...(favorite && { favorite }),
      },
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
