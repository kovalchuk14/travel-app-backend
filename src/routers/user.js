import { authenticate } from '../middlewares/authenticate.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUsersController, getUserByIdController } from '../controllers/user.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));
router.get('/:userId', ctrlWrapper(getUserByIdController));
router.use(authenticate);

export default router;
