import { authenticate } from '../middlewares/authenticate.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCurrentUser,
  getUserByIdController,
  updateAvatar,
  getUsersController,
  addSavedArticle,
  removeSavedArticle,
  patchUserController,
} from '../controllers/user.js';
import { isValidId } from '../middlewares/isValidUserId.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { patchUserSchema } from '../validation/user.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController))


router.get('/me', authenticate, ctrlWrapper(getCurrentUser));

router.patch('/me', authenticate, validateBody(patchUserSchema),  ctrlWrapper(patchUserController));
router.patch('/avatar', authenticate, upload.single('avatar'),  ctrlWrapper(updateAvatar));
// Приватні ендпоінти для saved articles
router.post('/saved-articles/:articleId', authenticate, ctrlWrapper(addSavedArticle));
router.delete('/saved-articles/:articleId', authenticate, ctrlWrapper(removeSavedArticle));

router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));
export default router;
