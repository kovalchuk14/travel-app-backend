import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
import { getUserById, getAllUsers } from '../services/users.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

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

  const users = await getAllUsers({ page, perPage });

  res.status(200).json({
    status: 200,
    message: 'Successfully found users!',
    data: users,
  });
};

export const updateUser = async (req, res) => {
  const userId = req.user._id;
  const { name, email, password } = req.body;

  if (!name && !email && !password) {
    throw createHttpError(400, 'No fields provided for update');
  }

  const updates = {};

  if (email) {
    const existingUser = await UserCollection.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      throw createHttpError(409, 'Email already in use');
    }
    updates.email = email.trim();
  }

  if (password) {
    if (password.length < 6) {
      throw createHttpError(400, 'Password must be at least 6 characters long');
    }
    updates.password = await bcrypt.hash(password, 10);
  }

  if (name) {
    if (name.trim().length < 2) {
      throw createHttpError(400, 'Name must be at least 2 characters long');
    }
    updates.name = name.trim();
  }

  const updatedUser = await UserCollection.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(updatedUser);
};
