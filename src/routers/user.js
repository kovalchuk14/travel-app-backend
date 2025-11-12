import { authenticate } from '../middlewares/authenticate.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getCurrentUser,
  getUserByIdController,
  getUsersController,
  addSavedArticle,
  removeSavedArticle,
} from '../controllers/user.js';
import { isValidId } from '../middlewares/isValidUserId.js';

const router = Router();

router.use(authenticate);
router.get('/me', ctrlWrapper(getCurrentUser));
router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));
router.get('/', ctrlWrapper(getUsersController));
// Приватні ендпоінти для saved articles
router.post('/saved-articles/:articleId', authenticate, addSavedArticle);
router.delete('/saved-articles/:articleId', authenticate, removeSavedArticle);

export default router;
