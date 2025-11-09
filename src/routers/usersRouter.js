import express from 'express';
import { toggleSavedArticle } from '../controllers/usersController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// POST /api/users/saved-articles/:articleId
router.post('/saved-articles/:articleId', auth, toggleSavedArticle);

export default router;

// Made by Yevhenii Feforchenko
