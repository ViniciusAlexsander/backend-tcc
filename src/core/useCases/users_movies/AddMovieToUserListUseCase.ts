import { inject, injectable } from 'tsyringe';
import { AppError } from '../../shared/errors/AppError';
import { IUsersMoviesRepository } from 'core/repositories/IUsersMoviesRepository';
import { IAddMovieToUserListInput } from 'core/ports/users_movies/IAddMovieToUserListInput';

@injectable()
export class AddMovieToUserListUseCase {
  constructor(
    @inject('UsersMoviesRepository')
    private usersMoviesRepository: IUsersMoviesRepository,
  ) {}

  async execute({ movieId, userId }: IAddMovieToUserListInput): Promise<void> {
    const movieAlreadyAdded = await this.usersMoviesRepository.findOne({
      movie_id: movieId,
      user_id: userId,
    });

    if (movieAlreadyAdded) {
      throw new AppError('Movie already added to user list');
    }

    // TODO: check if movie exists

    await this.usersMoviesRepository.create({
      movie_id: movieId,
      user_id: userId,
    });
  }
}
