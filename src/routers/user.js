import { authenticate } from '../middlewares/authenticate.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCurrentUser, getUserByIdController } from '../controllers/user.js';

const router = Router();

router.use(authenticate);
router.get('/me', authenticate, ctrlWrapper(getCurrentUser));
router.get('/:userId', ctrlWrapper(getUserByIdController));


export default router;
