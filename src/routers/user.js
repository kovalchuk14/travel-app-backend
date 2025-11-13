import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCurrentUser,
  getUserByIdController,
  getUsersController,
  updateUser,
} from '../controllers/user.js';
import { isValidId } from '../middlewares/isValidUserId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../schemas/userSchemas.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getUsersController));
router.get('/me', ctrlWrapper(getCurrentUser));
router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

router.patch('/me', validateBody(updateUserSchema), ctrlWrapper(updateUser));

export default router;
