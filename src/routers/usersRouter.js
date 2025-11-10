// usersRouter.js
import express from 'express';
import {
  addSavedArticle,
  removeSavedArticle,
} from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Приватні ендпоінти для saved articles
router.post('/saved-articles/:articleId', auth, addSavedArticle);
router.delete('/saved-articles/:articleId', auth, removeSavedArticle);

export default router;

// Made by Yevhenii Fedorchenko
