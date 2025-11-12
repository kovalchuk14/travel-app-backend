import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import storyRouter from './story.js';
import usersRouter from './usersRouter.js';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/stories', storyRouter);router.use('/users', usersRouter);

export default router;
