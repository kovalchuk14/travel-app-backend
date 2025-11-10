import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import storyRouter from './story.js';


const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/stories', storyRouter);


export default router;
