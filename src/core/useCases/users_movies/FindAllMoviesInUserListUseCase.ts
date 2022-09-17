import { inject, injectable } from 'tsyringe';
import { IUsersMoviesRepository } from 'core/repositories/IUsersMoviesRepository';
import { IFindAllMoviesInUserListInput } from 'core/ports/users_movies/IFindAllMovieInUserListInput';
import { IFindAllMoviesInUserListOutput } from 'core/ports/users_movies/IFindAllMoviesInUserListOutput';

@injectable()
export class FindAllMoviesInUserListUseCase {
  constructor(
    @inject('UsersMoviesRepository')
    private usersMoviesRepository: IUsersMoviesRepository,
  ) {}

  async execute({
    userId,
  }: IFindAllMoviesInUserListInput): Promise<IFindAllMoviesInUserListOutput> {
    const userMovie = await this.usersMoviesRepository.findAll({
      user_id: userId,
    });

    return {
      userId,
      movies: userMovie.map(this.formatMovie),
    };
  }

  formatMovie(movie) {
    return {
      movieId: movie.movie_id,
      watched: movie?.watched,
      favorite: movie?.favorite,
      rating: movie?.rating,
    };
  }
}
