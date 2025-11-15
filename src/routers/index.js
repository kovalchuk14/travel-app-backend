import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import storyRouter from './story.js';
import categoryRouter from './category.js';


const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/stories', storyRouter);
router.use('/categories', categoryRouter);


export default router;
