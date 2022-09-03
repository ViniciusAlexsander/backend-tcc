import { ICreateUserInput } from 'core/ports/users/ICreateUserInput';
import { GetUsersUseCase } from 'core/useCases/users/GetUsersUseCase';
import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '../../core/useCases/users/CreateUserUseCase';
import { checkAuthentication } from '../middlewares/checkAuthentication';
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

userRoutes.get(
  '/',
  checkAuthentication,
  async (req: Request, res: Response): Promise<Response> => {
    const getUsersUseCase = container.resolve(GetUsersUseCase);
    const users = await getUsersUseCase.execute();

    return res.status(201).json(users);
  },
);

export { userRoutes };
