import { UsersCollection } from '../db/models/User.js';
import { ArticlesCollection } from '../db/models/Article.js';

export const toggleSavedArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    const user = await UsersCollection.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const article = await ArticlesCollection.findById(articleId);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    const isSaved = user.savedArticles.some(
      (id) => id.toString() === articleId,
    );

    if (isSaved) {
      user.savedArticles = user.savedArticles.filter(
        (id) => id.toString() !== articleId,
      );
      await user.save();
      return res.status(200).json({
        message: 'Article removed from saved list',
        savedArticles: user.savedArticles,
      });
    } else {
      user.savedArticles.push(articleId);
      await user.save();
      return res.status(200).json({
        message: 'Article added to saved list',
        savedArticles: user.savedArticles,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Made by Yevhenii Feforchenko
