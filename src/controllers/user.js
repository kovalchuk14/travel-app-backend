import cloudinary from '../utils/cloudinary.js';
import { UsersCollection } from '../db/models/user.js';
import { getUserById } from '../services/user.js';

export const updateAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars',
      resource_type: 'image',
    });

    const updatedUser = await UsersCollection.findByIdAndUpdate(
      req.user.id,
      { avatarUrl: result.secure_url },
      { new: true },
    );

    res.status(200).json({
      status: 200,
      message: 'Avatar updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
