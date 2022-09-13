import { Router } from 'express';
import { container } from 'tsyringe';
import { IAddGroupToUserInput } from '../../core/ports/groups_users/IAddUserToGroupInput';
import { IFindGroupsUsersInput } from '../../core/ports/groups_users/IFindGroupsUsersInput';
import { IRemoveUserFromGroupInput } from '../../core/ports/groups_users/IRemoveUserFromGroupInput';
import { AddUserToGroupUseCase } from '../../core/useCases/groups_users/AddUserToGroupUseCase';
import { FindGroupsUsersUseCase } from '../../core/useCases/groups_users/FindGroupsUsersUseCase';
import { RemoveUserFromGroupUseCase } from '../../core/useCases/groups_users/RemoveUserFromGroup';
import { checkAuthentication } from '../middlewares/checkAuthentication';
import { ICheckUserAdminInput } from '../../core/ports/groups_users/ICheckUserAdminInput';
import { CheckUserAdminUseCase } from '../../core/useCases/groups_users/CheckUserAdminUseCase';

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

groupsUsersRoutes.get('/check-admin', checkAuthentication, async (req, res) => {
  const data: ICheckUserAdminInput = {
    groupId: req.query.groupId as string,
    userIdLogged: req.usuario.id,
  };

  const checkUserAdminUseCase = container.resolve(CheckUserAdminUseCase);
  const response = await checkUserAdminUseCase.execute(data);

  return res.status(200).json(response);
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
