import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);


export default router;
