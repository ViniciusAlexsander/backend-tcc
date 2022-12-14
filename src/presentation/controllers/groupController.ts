import { Router } from 'express';
import { container } from 'tsyringe';
import { ICreateGroupInput } from '../../core/ports/groups/ICreateGroupInput';
import { IFindGroupInput } from '../../core/ports/groups/IFindGroupInput';
import { CreateGroupUseCase } from '../../core/useCases/groups/CreateGroupUseCase';
import { FindGroupsUseCase } from '../../core/useCases/groups/FindGroupsUseCase';
import { checkAuthentication } from '../middlewares/checkAuthentication';
import { DeleteGroupUseCase } from '../../core/useCases/groups/DeleteGroupUseCase';

const groupRoutes = Router();

groupRoutes.post('/', checkAuthentication, async (req, res) => {
  const createGroupUseCase = container.resolve(CreateGroupUseCase);

  const data: ICreateGroupInput = {
    title: req.body.title,
    description: req.body.description,
    userId: req.usuario.id,
  };

  await createGroupUseCase.execute(data);

  return res.status(201).json({ message: 'Group created' });
});

groupRoutes.get('/', checkAuthentication, async (req, res) => {
  const findGroupsUseCase = container.resolve(FindGroupsUseCase);
  const { id, title, isMember }: IFindGroupInput = req.query;

  const group = await findGroupsUseCase.execute({
    id,
    title,
    isMember,
    idUserLogged: req.usuario.id as string,
  });

  return res.status(200).json(group);
});

groupRoutes.delete('/:id', checkAuthentication, async (req, res) => {
  const deleteGroupUseCase = container.resolve(DeleteGroupUseCase);

  const { id } = req.params;
  await deleteGroupUseCase.execute({ id });

  return res.status(200).json({ message: 'Group deleted' });
});

export { groupRoutes };
