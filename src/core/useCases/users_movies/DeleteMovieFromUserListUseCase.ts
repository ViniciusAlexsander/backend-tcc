import { inject, injectable } from 'tsyringe';
import { AppError } from '../../shared/errors/AppError';
import { IUsersMoviesRepository } from 'core/repositories/IUsersMoviesRepository';
import { IAddMovieToUserListInput } from 'core/ports/users_movies/IAddMovieToUserListInput';
import { IDeletMovieFromUserListInput } from 'core/ports/users_movies/IDeleteMovieFromUserListInput';

@injectable()
export class DeleteMovieFromUserListUseCase {
  constructor(
    @inject('UsersMoviesRepository')
    private usersMoviesRepository: IUsersMoviesRepository,
  ) {}

  async execute({
    movieId,
    userId,
  }: IDeletMovieFromUserListInput): Promise<void> {
    const movieInList = await this.usersMoviesRepository.findOne({
      movie_id: movieId,
      user_id: userId,
    });

    if (!movieInList) {
      throw new AppError('Movie not found in user list', 404);
    }

    await this.usersMoviesRepository.delete({
      movie_id: movieId,
      user_id: userId,
    });
  }
}
