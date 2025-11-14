import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getCurrentUser,
  getUserByIdController,
  getUsersController,
  updateAvatar,
} from '../controllers/user.js';

import {
  addSavedArticle,
  removeSavedArticle,
  patchUserController,
} from '../controllers/user.js';
import { isValidId } from '../middlewares/isValidUserId.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { patchUserSchema } from '../validation/user.js';

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getUsersController));
router.get('/me', ctrlWrapper(getCurrentUser));
router.patch(
  '/me',
  validateBody(patchUserSchema),
  ctrlWrapper(patchUserController),
);
router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));
router.patch('/avatar', upload.single('avatar'), ctrlWrapper(updateAvatar));
// Приватні ендпоінти для saved articles
router.post(
  '/saved-articles/:articleId',
  authenticate,
  ctrlWrapper(addSavedArticle),
);
router.delete(
  '/saved-articles/:articleId',
  authenticate,
  ctrlWrapper(removeSavedArticle),
);

router.get('/', ctrlWrapper(getUsersController));

router.get('/me', ctrlWrapper(getCurrentUser));

router.patch(
  '/me',
  validateBody(patchUserSchema),
  ctrlWrapper(patchUserController),
);

router.patch('/avatar', upload.single('avatar'), ctrlWrapper(updateAvatar));

router.post('/saved-articles/:articleId', ctrlWrapper(addSavedArticle));
router.delete('/saved-articles/:articleId', ctrlWrapper(removeSavedArticle));

router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

export default router;
