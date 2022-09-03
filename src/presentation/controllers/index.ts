import { Router } from 'express';
import { authRoutes } from './authenticateController';
import { groupRoutes } from './groupController';
import { userRoutes } from './userController';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

export { router };
