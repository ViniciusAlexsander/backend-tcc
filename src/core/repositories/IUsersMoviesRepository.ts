import { IIndexUsersMoviesDto } from 'core/domain/dtos/users_movies/IIndexUsersMoviesDto';
import { IFindOneUsersMoviesDto } from 'core/domain/dtos/users_movies/IFindOneUsersMoviesDto';
import { IAddMovieToUserListDto } from 'core/domain/dtos/users_movies/IAddMovieToUserListDto';
import { UsersMovies } from 'infra/entities/UsersMovies';
import { IUpdateMovieInUserListDto } from 'core/domain/dtos/users_movies/IUpdateMovieInUserListDto';
import { IDeleteMovieFromUserListDto } from 'core/domain/dtos/users_movies/IDeleteMovieFromUserListDto';

export interface IUsersMoviesRepository {
  create({ movie_id, user_id, watched }: IAddMovieToUserListDto): Promise<UsersMovies>;
  update({
    movie_id,
    user_id,
    watched,
    favorite,
    rating,
  }: IUpdateMovieInUserListDto): Promise<UsersMovies>;
  delete({ user_id, movie_id }: IDeleteMovieFromUserListDto): Promise<void>;
  index({ user_id }: IIndexUsersMoviesDto): Promise<UsersMovies[]>;
  findOne({ movie_id, user_id }: IFindOneUsersMoviesDto): Promise<UsersMovies>;
}
