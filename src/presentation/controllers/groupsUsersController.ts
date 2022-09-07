import { IAddGroupToUserInput } from 'core/ports/groups_users/IAddUserToGroupInput';
import { IFindGroupsUsersInput } from 'core/ports/groups_users/IFindGroupsUsersInput';
import { AddUserToGroupUseCase } from 'core/useCases/groups_users/AddUserToGroupUseCase';
import { FindGroupsUsersUseCase } from 'core/useCases/groups_users/FindGroupsUsersUseCase';
import { Router } from 'express';
import { checkAuthentication } from 'presentation/middlewares/checkAuthentication';
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

export { groupsUsersRoutes };
