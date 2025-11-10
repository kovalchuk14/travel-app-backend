import { UsersCollection } from '../db/models/user.js';
import { TravellersCollection } from '../db/models/traveller.js';

// Додати статтю у savedArticles
export const addSavedArticle = async (req, res) => {
  const { articleId } = req.params;
  const userId = req.userId;

  try {
    const user = await UsersCollection.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const article = await TravellersCollection.findById(articleId);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    if (!user.savedArticles?.some((id) => id.toString() === articleId)) {
      user.savedArticles = user.savedArticles || [];
      user.savedArticles.push(articleId);
      article.favoriteCount += 1;
      await Promise.all([user.save(), article.save()]);
    }

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
  const userId = req.userId;

  try {
    const user = await UsersCollection.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const article = await TravellersCollection.findById(articleId);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    if (user.savedArticles?.some((id) => id.toString() === articleId)) {
      user.savedArticles = user.savedArticles.filter(
        (id) => id.toString() !== articleId,
      );
      article.favoriteCount = Math.max(article.favoriteCount - 1, 0);
      await Promise.all([user.save(), article.save()]);
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
