import { authenticate } from '../middlewares/authenticate.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCurrentUser, getUserByIdController } from '../controllers/user.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.use(authenticate);
router.get('/me', ctrlWrapper(getCurrentUser));
router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

export default router;
