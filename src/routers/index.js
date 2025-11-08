import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter); // роут користувачів під /users

export default router;
