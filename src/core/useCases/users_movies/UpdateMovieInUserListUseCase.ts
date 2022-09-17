import { inject, injectable } from 'tsyringe';
import { AppError } from '../../shared/errors/AppError';
import { IUsersMoviesRepository } from 'core/repositories/IUsersMoviesRepository';
import { IUpdateMovieInUserListInput } from 'core/ports/users_movies/IUpdateMovieInUserListInput';
import { IUpdateMovieInUserListOutput } from 'core/ports/users_movies/IUpdateMovieInUserListOutput';

@injectable()
export class UpdateMovieInUserListUseCase {
  constructor(
    @inject('UsersMoviesRepository')
    private usersMoviesRepository: IUsersMoviesRepository,
  ) {}

  async execute({
    movieId,
    userId,
    watched,
    favorite,
    rating,
  }: IUpdateMovieInUserListInput): Promise<IUpdateMovieInUserListOutput> {
    const movieInList = await this.usersMoviesRepository.findOne({
      movie_id: movieId,
      user_id: userId,
    });

    if (!movieInList) {
      throw new AppError('Movie not found in user list', 404);
    }

    const movieUpdated = await this.usersMoviesRepository.update({
      movie_id: movieId,
      user_id: userId,
      watched,
      favorite,
      rating,
    });

    return {
      movieId: movieUpdated.movie_id,
      userId: movieUpdated.user_id,
      watched: movieUpdated.watched,
      favorite: movieUpdated.favorite,
      rating: movieUpdated.rating,
    };
  }
}
