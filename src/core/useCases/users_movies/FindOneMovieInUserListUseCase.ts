import { inject, injectable } from 'tsyringe';
import { IUsersMoviesRepository } from 'core/repositories/IUsersMoviesRepository';
import { IFindOneMovieInUserListInput } from 'core/ports/users_movies/IFindOneMovieInUserListInput';
import { IFindOneMovieInUserListOutput } from 'core/ports/users_movies/IFindOneMovieInUserListOutput';

@injectable()
export class FindOneMoviesInUserListUseCase {
  constructor(
    @inject('UsersMoviesRepository')
    private usersMoviesRepository: IUsersMoviesRepository,
  ) {}

  async execute({
    userId,
    movieId,
  }: IFindOneMovieInUserListInput): Promise<IFindOneMovieInUserListOutput> {
    const userMovie = await this.usersMoviesRepository.findOne({
      user_id: userId,
      movie_id: movieId,
    });

    return {
      userId,
      movie: {
        movieId: userMovie ? userMovie.movie_id : movieId,
        watched: userMovie ? userMovie.watched : null ,
        favorite: userMovie ? userMovie.favorite : false,
        rating: userMovie ? userMovie.rating : null,
      },
    };
  }
}
