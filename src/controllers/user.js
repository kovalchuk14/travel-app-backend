import { getUserById, getAllUsers } from '../services/users.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { UsersCollection } from '../db/models/user.js';
import { storiesCollection } from '../db/models/story.js';

// Додати статтю у savedArticles
export const addSavedArticle = async (req, res) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  try {
    // Атомарне додавання статті в savedArticles
    const user = await UsersCollection.findByIdAndUpdate(
      userId,
      { $addToSet: { savedArticles: articleId } }, // додає тільки якщо немає
      { new: true } // повертає оновлений документ
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Атомарне збільшення favoriteCount у статті
    const article = await storiesCollection.findByIdAndUpdate(
      articleId,
      { $inc: { favoriteCount: 1 } },
      { new: true }
    );

    if (!article) return res.status(404).json({ message: 'Article not found' });

    res.status(200).json({
      message: 'Article added to saved list',
      savedArticles: user.savedArticles,
      favoriteCount: article.favoriteCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Видалити статтю з savedArticles
export const removeSavedArticle = async (req, res) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  try {
    // Атомарне видалення статті з savedArticles
    const user = await UsersCollection.findByIdAndUpdate(
      userId,
      { $pull: { savedArticles: articleId } }, // видаляє, якщо є
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Атомарне зменшення favoriteCount у статті, не менше 0
    const article = await storiesCollection.findByIdAndUpdate(
      articleId,
      { $inc: { favoriteCount: -1 } },
      { new: true }
    );

    if (!article) return res.status(404).json({ message: 'Article not found' });

    // Мінімальне обмеження favoriteCount
    if (article.favoriteCount < 0) {
      article.favoriteCount = 0;
      await article.save();
    }

    res.status(200).json({
      message: 'Article removed from saved list',
      savedArticles: user.savedArticles,
      favoriteCount: article.favoriteCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// By Yevhenii Fedorchenko

export const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: 200,
    message: 'Current user retrieved successfully',
    data: user,
  });
};

export const getUserByIdController = async (req, res) => {
  const { userId } = req.params;
  const user = await getUserById(userId);
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'User not found',
    });
  }
  res.json({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
    data: user,
  });
};

export const getUsersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const users = await getAllUsers({
    page,
    perPage,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found users!',
    data: users,
  });
};
