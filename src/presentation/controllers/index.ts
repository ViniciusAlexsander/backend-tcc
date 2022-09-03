import { Router } from 'express';
import { authRoutes } from './authenticateController';
import { userRoutes } from './userController';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

export { router };
