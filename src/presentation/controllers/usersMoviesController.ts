import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { IAddMovieToUserListInput } from 'core/ports/users_movies/IAddMovieToUserListInput';
import { UpdateMovieInUserListUseCase } from 'core/useCases/users_movies/UpdateMovieInUserListUseCase';
import { IUpdateMovieInUserListInput } from 'core/ports/users_movies/IUpdateMovieInUserListInput';
import { AddMovieToUserListUseCase } from 'core/useCases/users_movies/AddMovieToUserListUseCase';
import { FindAllMoviesInUserListUseCase } from 'core/useCases/users_movies/FindAllMoviesInUserListUseCase';
import { IFindAllMoviesInUserListInput } from 'core/ports/users_movies/IFindAllMovieInUserListInput';
import { checkAuthentication } from 'presentation/middlewares/checkAuthentication';
import { IDeletMovieFromUserListInput } from 'core/ports/users_movies/IDeleteMovieFromUserListInput';
import { DeleteMovieFromUserListUseCase } from 'core/useCases/users_movies/DeleteMovieFromUserListUseCase';

export const usersMoviesRoutes = Router();

usersMoviesRoutes.post(
  '/',
  checkAuthentication,
  async (req: Request, res: Response): Promise<Response> => {
    const data: IAddMovieToUserListInput = {
      userId: req.usuario.id,
      movieId: req.query.movieId as string,
    };

    const createUserUseCase = container.resolve(AddMovieToUserListUseCase);
    await createUserUseCase.execute(data);

    return res.status(201).send();
  },
);

usersMoviesRoutes.put(
  '/',
  checkAuthentication,
  async (req: Request, res: Response): Promise<Response> => {
    const data: IUpdateMovieInUserListInput = {
      userId: req.usuario.id,
      movieId: req.query.movieId as string,
      watched: req.body.watched,
      favorite: req.body.favorite,
      rating: req.body.rating,
    };

    const createUserUseCase = container.resolve(UpdateMovieInUserListUseCase);
    const movieUpdatedInList = await createUserUseCase.execute(data);

    return res.status(201).json(movieUpdatedInList);
  },
);

usersMoviesRoutes.delete(
  '/',
  checkAuthentication,
  async (req: Request, res: Response): Promise<Response> => {
    const data: IDeletMovieFromUserListInput = {
      userId: req.usuario.id,
      movieId: req.query.movieId as string,
    };

    const createUserUseCase = container.resolve(DeleteMovieFromUserListUseCase);
    await createUserUseCase.execute(data);

    return res.status(201).send();
  },
);

usersMoviesRoutes.get(
  '/',
  checkAuthentication,
  async (req: Request, res: Response): Promise<Response> => {
    const findUserUseCase = container.resolve(FindAllMoviesInUserListUseCase);
    const data: IFindAllMoviesInUserListInput = {
      userId: req.usuario.id,
    };

    const userMovies = await findUserUseCase.execute(data);

    return res.status(201).json(userMovies);
  },
);
