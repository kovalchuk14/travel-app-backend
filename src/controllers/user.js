import createHttpError from 'http-errors';
import cloudinary from '../utils/cloudinary.js';
import { getUserById, getAllUsers, patchUserService } from '../services/users.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { UserCollection } from '../db/models/user.js';
import { storiesCollection } from '../db/models/story.js';

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.user?._id) {
      throw createHttpError(401, 'User not authenticated');
    }

    const user = await UserCollection.findById(req.user._id);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    if (!req.file) {
      throw createHttpError(400, 'No file uploaded');
    }

    // Видаляємо старий аватар, якщо існує
    if (user.avatarPublicId) {
      await cloudinary.deleteFile(user.avatarPublicId);
    }

    // Завантажуємо новий аватар
    const uploaded = await cloudinary.uploadFile(req.file, 'avatars');

    // Оновлюємо користувача в базі
    user.avatarUrl = uploaded.secureUrl;
    user.avatarPublicId = uploaded.publicId;
    await user.save();

    res.status(200).json({
      status: 200,
      message: 'Avatar updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Додати статтю у savedArticles
export const addSavedArticle = async (req, res) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  try {
    // Атомарне додавання статті в savedArticles

    const user = await UserCollection.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });
    const alreadySaved = user.savedArticles.includes(articleId);
    if (alreadySaved) {
      return res.status(200).json({
        message: 'Article already in saved list',
        savedArticles: user.savedArticles,
      });
    }
    user.savedArticles.push(articleId);
    await user.save();

    const article = await storiesCollection.findById(articleId);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    article.favoriteCount += 1;
    await article.save();

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
    const user = await UserCollection.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

     const isSaved = user.savedArticles.includes(articleId);
    if (!isSaved) {
      return res.status(200).json({
        message: 'Article not in saved list',
        savedArticles: user.savedArticles,
      });
    }

    user.savedArticles = user.savedArticles.filter(id => id.toString() !== articleId);
    await user.save();

    const article = await storiesCollection.findById(articleId);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    article.favoriteCount = Math.max(0, article.favoriteCount - 1);
    await article.save();

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
  res.status(200).json({
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

export const patchUserController = async (req, res) => {
  console.log("HEADERS:", req.headers);
console.log("RAW BODY:", req.rawBody);
console.log("BODY:", req.body);
  const userId = req.user._id;
  const updatesData = req.body;

  const updatedUser = await patchUserService(userId, updatesData);

  res.status(200).json({
    status: 200,
    message: "User updated successfully",
    data: updatedUser,
  });
}
