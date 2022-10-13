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

    if (!movieInList && (watched != null || favorite || rating)) {
      await this.usersMoviesRepository.create({
        movie_id: movieId,
        user_id: userId,
        watched,
      });
    }

    const movieUpdated = await this.usersMoviesRepository.update({
      movie_id: movieId,
      user_id: userId,
      watched,
      favorite,
      rating,
    });

    if (
      movieUpdated &&
      movieUpdated.watched == null &&
      !movieUpdated.favorite &&
      movieUpdated.rating == null
    ) {
      await this.usersMoviesRepository.delete({
        movie_id: movieId,
        user_id: userId,
      });
    }

    return {
      movieId: movieUpdated.movie_id,
      userId: movieUpdated.user_id,
      watched: movieUpdated.watched,
      favorite: movieUpdated.favorite,
      rating: movieUpdated.rating,
    };
  }
}
