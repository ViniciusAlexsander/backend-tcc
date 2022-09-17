import { IFindAllUsersMoviesDto } from 'core/domain/dtos/users_movies/IFindAllUsersMoviesDto';
import { IFindOneUsersMoviesDto } from 'core/domain/dtos/users_movies/IFindOneUsersMoviesDto';
import { IAddMovieToUserListDto } from 'core/domain/dtos/users_movies/IAddMovieToUserListDto';
import { UsersMovies } from 'infra/entities/UsersMovies';
import { IUpdateMovieInUserListDto } from 'core/domain/dtos/users_movies/IUpdateMovieInUserListDto';
import { IDeleteMovieFromUserListDto } from 'core/domain/dtos/users_movies/IDeleteMovieFromUserListDto';

export interface IUsersMoviesRepository {
  create({ movie_id, user_id }: IAddMovieToUserListDto): Promise<void>;
  update({
    movie_id,
    user_id,
    watched = false,
    favorite = false,
    rating = null,
  }: IUpdateMovieInUserListDto): Promise<UsersMovies>;
  delete({ user_id, movie_id }: IDeleteMovieFromUserListDto): Promise<void>;
  findAll({ user_id }: IFindAllUsersMoviesDto): Promise<UsersMovies[]>;
  findOne({ movie_id, user_id }: IFindOneUsersMoviesDto): Promise<UsersMovies>;
}
