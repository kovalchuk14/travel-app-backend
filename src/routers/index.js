import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import storyRouter from './story.js';
import userRouter from './user.js';


const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/stories', storyRouter);
router.use('/users', userRouter);

export default router;
