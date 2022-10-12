import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { IAddMovieToUserListInput } from '../../core/ports/users_movies/IAddMovieToUserListInput';
import { UpdateMovieInUserListUseCase } from '../../core/useCases/users_movies/UpdateMovieInUserListUseCase';
import { IUpdateMovieInUserListInput } from '../../core/ports/users_movies/IUpdateMovieInUserListInput';
import { AddMovieToUserListUseCase } from '../../core/useCases/users_movies/AddMovieToUserListUseCase';
import { IndexMoviesInUserListUseCase } from '../../core/useCases/users_movies/IndexMoviesInUserListUseCase';
import { IIndexMoviesInUserListInput } from '../../core/ports/users_movies/IIndexMovieInUserListInput';
import { checkAuthentication } from '../../presentation/middlewares/checkAuthentication';
import { IDeletMovieFromUserListInput } from '../../core/ports/users_movies/IDeleteMovieFromUserListInput';
import { DeleteMovieFromUserListUseCase } from '../../core/useCases/users_movies/DeleteMovieFromUserListUseCase';
import { FindOneMoviesInUserListUseCase } from '../../core/useCases/users_movies/FindOneMovieInUserListUseCase';
import { IFindOneMovieInUserListInput } from '../../core/ports/users_movies/IFindOneMovieInUserListInput';
import { formatStringData } from '../helpers/formatStringData';

const usersMoviesRoutes = Router();

usersMoviesRoutes.post(
  '/:id',
  checkAuthentication,
  async (req: Request, res: Response): Promise<Response> => {
    const data: IAddMovieToUserListInput = {
      userId: req.usuario.id,
      movieId: req.params.id,
    };

    const createUserUseCase = container.resolve(AddMovieToUserListUseCase);
    const response = await createUserUseCase.execute(data);

    return res.status(201).json(response);
  },
);

usersMoviesRoutes.put(
  '/:id',
  checkAuthentication,
  async (req: Request, res: Response): Promise<Response> => {
    const { watched, favorite, rating } = req.body;
    const data: IUpdateMovieInUserListInput = {
      userId: req.usuario.id,
      movieId: req.params.id,
      watched,
      favorite,
      rating,
    };

    const updateMovieInUserListUseCase = container.resolve(
      UpdateMovieInUserListUseCase,
    );
    const movieUpdatedInList = await updateMovieInUserListUseCase.execute(data);

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
    const indexMovieInUserListUseCase = container.resolve(
      IndexMoviesInUserListUseCase,
    );
    const data: IIndexMoviesInUserListInput = {
      userId: req.usuario.id,
      watched: req.query.watched as '0' | '1' | '2',
      favorite: formatStringData(req.query.favorite as string),
    };

    const userMovies = await indexMovieInUserListUseCase.execute(data);

    return res.status(201).json(userMovies);
  },
);

usersMoviesRoutes.get(
  '/:id',
  checkAuthentication,
  async (req: Request, res: Response): Promise<Response> => {
    const findUserUseCase = container.resolve(FindOneMoviesInUserListUseCase);
    const data: IFindOneMovieInUserListInput = {
      userId: req.usuario.id,
      movieId: req.params.id,
    };

    const userMovies = await findUserUseCase.execute(data);

    return res.status(201).json(userMovies);
  },
);

export { usersMoviesRoutes };
