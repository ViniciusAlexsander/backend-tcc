import { Router } from 'express';
import { authRoutes } from './authenticateController';
import { groupRoutes } from './groupController';
import { groupsUsersRoutes } from './groupsUsersController';
import { movieCommentsRoutes } from './movieComments';
import { sessionRoutes } from './sessionController';
import { sessionUsersRoutes } from './sessionUsersController';
import { userRoutes } from './userController';
import { usersMoviesRoutes } from './usersMoviesController';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/groups-users', groupsUsersRoutes);
router.use('/sessions', sessionRoutes);
router.use('/sessions-users', sessionUsersRoutes);
router.use('/users-movies', usersMoviesRoutes);
router.use('/movies-comments', movieCommentsRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

export { router };
