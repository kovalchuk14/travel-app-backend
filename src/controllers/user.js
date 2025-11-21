import createHttpError from 'http-errors';
import cloudinary from '../utils/cloudinary.js';

import {
  getUserById,
  getAllUsers,
  patchUserService,
} from '../services/users.js';

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

    if (user.avatarPublicId) {
      await cloudinary.deleteFile(user.avatarPublicId);
    }

    const uploaded = await cloudinary.uploadFile(req.file, 'avatars');

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

export const addSavedArticle = async (req, res) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  try {
    const user = await UserCollection.findByIdAndUpdate(
      userId,
      { $addToSet: { savedArticles: articleId } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const article = await storiesCollection.findByIdAndUpdate(
      articleId,
      { $inc: { favoriteCount: 1 } },
      { new: true },
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
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

export const removeSavedArticle = async (req, res) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  try {
    const user = await UserCollection.findByIdAndUpdate(
      userId,
      { $pull: { savedArticles: articleId } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const article = await storiesCollection.findByIdAndUpdate(
      articleId,
      { $inc: { favoriteCount: -1 } },
      { new: true },
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

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

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Current user retrieved successfully',
    data: req.user,
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
  const users = await getAllUsers({ page, perPage });

  res.status(200).json({
    status: 200,
    message: 'Successfully found users!',
    data: users,
  });
};

export const patchUserController = async (req, res) => {
  const userId = req.user._id;
  const updatesData = req.body;

  const updatedUser = await patchUserService(userId, updatesData);

  res.status(200).json({
    status: 200,
    message: 'User updated successfully',
    data: updatedUser,
  });
};
