import { Router } from 'express';
import { authRoutes } from './authenticateController';
import { groupRoutes } from './groupController';
import { groupsUsersRoutes } from './groupsUsersController';
import { sessionRoutes } from './sessionController';
import { userRoutes } from './userController';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/groups-users', groupsUsersRoutes);
router.use('/sessions', sessionRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

export { router };
