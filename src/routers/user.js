import { authenticate } from '../middlewares/authenticate.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCurrentUser,
  getUserByIdController,
  updateAvatar,
  getUsersController,
} from '../controllers/user.js';
import { isValidId } from '../middlewares/isValidUserId.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);
router.get('/me', ctrlWrapper(getCurrentUser));
router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));
router.get('/', ctrlWrapper(getUsersController));
router.patch('/avatar', upload.single('avatar'), ctrlWrapper(updateAvatar));

export default router;
