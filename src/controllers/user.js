import createHttpError from 'http-errors';
import cloudinary from '../utils/cloudinary.js';
import { UsersCollection } from '../db/models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.user?._id) {
      throw createHttpError(401, 'User not authenticated');
    }

    const user = await UsersCollection.findById(req.user._id);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    if (!req.file) {
      throw createHttpError(400, 'No file uploaded');
    }

    // Видаляємо старий аватар, якщо існує
    if (user.avatarPublicId) {
      await cloudinary.uploader.destroy(user.avatarPublicId, {
        resource_type: 'image',
      });
    }

    // Завантажуємо новий аватар
    const uploaded = await saveFileToCloudinary(req.file, 'avatars');

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
