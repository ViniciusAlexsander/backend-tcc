import { inject, injectable } from 'tsyringe';
import { IUsersMoviesRepository } from 'core/repositories/IUsersMoviesRepository';
import { IIndexMoviesInUserListInput } from 'core/ports/users_movies/IIndexMovieInUserListInput';
import { IIndexMoviesInUserListOutput } from 'core/ports/users_movies/IIndexMoviesInUserListOutput';

@injectable()
export class IndexMoviesInUserListUseCase {
  constructor(
    @inject('UsersMoviesRepository')
    private usersMoviesRepository: IUsersMoviesRepository,
  ) {}

  async execute({
    userId,
    watched,
    favorite,
  }: IIndexMoviesInUserListInput): Promise<IIndexMoviesInUserListOutput> {
    const userMovie = await this.usersMoviesRepository.index({
      user_id: userId,
      watched,
      favorite,
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
