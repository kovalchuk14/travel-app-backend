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
} from '../controllers/user.js';
import { isValidId } from '../middlewares/isValidUserId.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getUsersController))
router.get('/me', ctrlWrapper(getCurrentUser));
router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));
router.get('/', ctrlWrapper(getUsersController));
router.patch('/avatar', upload.single('avatar'), ctrlWrapper(updateAvatar));
// Приватні ендпоінти для saved articles
router.post('/saved-articles/:articleId', authenticate, addSavedArticle);
router.delete('/saved-articles/:articleId', authenticate, removeSavedArticle);


export default router;
