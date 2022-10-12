import { ICreateUserInput } from '../../core/ports/users/ICreateUserInput';
import { IFindUsersInput } from '../../core/ports/users/IFindUsersInput';
import { FindUsersUseCase } from '../../core/useCases/users/FindUsersUseCase';
import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '../../core/useCases/users/CreateUserUseCase';
import { FindUserUseCase } from 'core/useCases/users/FindUserUseCase';
import { IFindUserInput } from 'core/ports/users/IFindUserInput';
import { checkAuthentication } from 'presentation/middlewares/checkAuthentication';
const userRoutes = Router();

userRoutes.post('/', async (req: Request, res: Response): Promise<Response> => {
  const { name, userName, email, password }: ICreateUserInput = req.body;
  const createUserUseCase = container.resolve(CreateUserUseCase);

  await createUserUseCase.execute({
    name,
    userName,
    email,
    password,
  });

  return res.status(201).send();
});

userRoutes.get('/', async (req: Request, res: Response): Promise<Response> => {
  const findUserUseCase = container.resolve(FindUsersUseCase);
  const data: IFindUsersInput = {
    id: req.query.id as string,
    userName: req.body.userName,
    email: req.body.email,
  };

  const users = await findUserUseCase.execute(data);

  return res.status(201).json(users);
});

userRoutes.get(
  '/me',
  checkAuthentication,
  async (req: Request, res: Response): Promise<Response> => {
    const findUserUseCase = container.resolve(FindUserUseCase);
    const data: IFindUserInput = {
      id: req.usuario.id as string,
    };

    const users = await findUserUseCase.execute(data);

    return res.status(201).json(users);
  },
);

export { userRoutes };
