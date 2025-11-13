import bcrypt from 'bcryptjs';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const updateUser = async (req, res) => {
  const userId = req.user._id;
  const { name, email, password } = req.body;

  if (!name && !email && !password) {
    throw createHttpError(400, 'No fields provided for update');
  }

  const updates = {};

  if (email) {
    const existingUser = await UsersCollection.findOne({ email });
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

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  const safeUser = updatedUser.toObject();
  delete safeUser.password;

  res.status(200).json(safeUser);
};
