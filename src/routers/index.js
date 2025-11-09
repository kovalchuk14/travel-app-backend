import { Router } from 'express';
import authRouter from './auth.js';
import storyRouter from './story.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/stories', storyRouter);


export default router;
