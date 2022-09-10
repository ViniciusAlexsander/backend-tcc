import { ICreateUserInput } from '../../core/ports/users/ICreateUserInput';
import { IFindUsersInput } from '../../core/ports/users/IFindUsersInput';
import { FindUsersUseCase } from '../../core/useCases/users/FindUsersUseCase';
import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '../../core/useCases/users/CreateUserUseCase';
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

export { userRoutes };
