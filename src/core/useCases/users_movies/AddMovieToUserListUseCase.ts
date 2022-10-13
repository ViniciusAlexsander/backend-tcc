import { inject, injectable } from 'tsyringe';
import { AppError } from '../../shared/errors/AppError';
import { IUsersMoviesRepository } from 'core/repositories/IUsersMoviesRepository';
import { IAddMovieToUserListInput } from 'core/ports/users_movies/IAddMovieToUserListInput';
import { IAddMovieToUserListOutput } from 'core/ports/users_movies/IAddMovieToUserListOutput';

@injectable()
export class AddMovieToUserListUseCase {
  constructor(
    @inject('UsersMoviesRepository')
    private usersMoviesRepository: IUsersMoviesRepository,
  ) {}

  async execute({
    movieId,
    userId,
  }: IAddMovieToUserListInput): Promise<IAddMovieToUserListOutput> {
    const movieAlreadyAdded = await this.usersMoviesRepository.findOne({
      movie_id: movieId,
      user_id: userId,
    });

    if (movieAlreadyAdded) {
      throw new AppError('Movie already added to user list');
    }

    const movieAdded = await this.usersMoviesRepository.create({
      movie_id: movieId,
      user_id: userId,
      watched: false,
    });

    return { watched: movieAdded.watched };
  }
}
