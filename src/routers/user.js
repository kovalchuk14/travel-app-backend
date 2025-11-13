import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getCurrentUser,
  getUserByIdController,
  getUsersController,
  updateUser,
  updateAvatar,
} from '../controllers/user.js';

import {
  addSavedArticle,
  removeSavedArticle,
} from '../controllers/savedArticles.js';

import { isValidId } from '../middlewares/isValidUserId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../schemas/userSchemas.js';

import upload from '../middlewares/upload.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getUsersController));

router.get('/me', ctrlWrapper(getCurrentUser));

router.patch('/me', validateBody(updateUserSchema), ctrlWrapper(updateUser));

router.patch('/avatar', upload.single('avatar'), ctrlWrapper(updateAvatar));

router.post('/saved-articles/:articleId', ctrlWrapper(addSavedArticle));
router.delete('/saved-articles/:articleId', ctrlWrapper(removeSavedArticle));

router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

export default router;
