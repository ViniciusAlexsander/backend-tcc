import { IAddGroupToUserInput } from '../../core/ports/groups_users/IAddUserToGroupInput';
import { IFindGroupsUsersInput } from '../../core/ports/groups_users/IFindGroupsUsersInput';
import { IRemoveUserFromGroupInput } from '../../core/ports/groups_users/IRemoveUserFromGroupInput';
import { AddUserToGroupUseCase } from '../../core/useCases/groups_users/AddUserToGroupUseCase';
import { FindGroupsUsersUseCase } from '../../core/useCases/groups_users/FindGroupsUsersUseCase';
import { RemoveUserFromGroupUseCase } from '../../core/useCases/groups_users/RemoveUserFromGroup';
import { Router } from 'express';
import { checkAuthentication } from '../middlewares/checkAuthentication';
import { container } from 'tsyringe';

const groupsUsersRoutes = Router();

groupsUsersRoutes.get('/', async (req, res) => {
  const findGroupsUsersUseCase = container.resolve(FindGroupsUsersUseCase);
  const { groupId, userId }: IFindGroupsUsersInput = req.query;

  const groupsUsers = await findGroupsUsersUseCase.execute({
    groupId,
    userId,
  });

  return res.status(200).json(groupsUsers);
});

groupsUsersRoutes.post('/', checkAuthentication, async (req, res) => {
  const addUserToGroup = container.resolve(AddUserToGroupUseCase);
  const { groupId, userId, isAdmin }: IAddGroupToUserInput = req.body;
  const { id } = req.usuario;

  const userAdded = await addUserToGroup.execute({
    groupId,
    userId,
    isAdmin,
    userIdLogged: id,
  });

  return res.status(201).json(userAdded);
});

groupsUsersRoutes.delete('/', checkAuthentication, async (req, res) => {
  const removeUserFromGroup = container.resolve(RemoveUserFromGroupUseCase);
  const data: IRemoveUserFromGroupInput = {
    groupId: req.query.groupId as string,
    userId: req.query.userId as string,
    userIdLogged: req.usuario.id,
  };

  await removeUserFromGroup.execute(data);
});

export { groupsUsersRoutes };
