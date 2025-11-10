import { authenticate } from '../middlewares/authenticate.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCurrentUser,
  getUserByIdController,
  updateAvatar,
} from '../controllers/user.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.use(authenticate);
router.get('/me', ctrlWrapper(getCurrentUser));
router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));
router.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(updateAvatar),
);

export default router;
