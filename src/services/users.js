import {UserCollection } from '../db/models/user.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import bcrypt from "bcrypt";
import createHttpError from 'http-errors';


export const getAllUsers = async ({
    page = 1,
    perPage = 10,
}) => {

    const skip =  (page - 1) * perPage;

    const [users, usersCount] = await Promise.all([
        UserCollection.find()
            .skip(skip)
            .limit(perPage),
        UserCollection.countDocuments(),
    ]);

    const paginationData = calculatePaginationData(usersCount, perPage, page);

    return {
        data: users,
        ...paginationData,
    };
};


export const getUserById = async (userId) => {
    const user = await UserCollection.findById(userId).populate('savedArticles');

    return user;
}


export const patchUserService = async (userId, updatesData) => {
  const user = await UserCollection.findById(userId);
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const updates = {};

  if (updatesData.email && updatesData.email !== user.email) {
    const existing = await UserCollection.findOne({
      email: updatesData.email,
      _id: { $ne: userId },
    });

    if (existing) {
      throw createHttpError(409, "Email already in use");
    }

    updates.email = updatesData.email.toLowerCase().trim();
  }

  if (updatesData.name && updatesData.name !== user.name) {
    updates.name = updatesData.name.trim();
  }

  if (
    typeof updatesData.description !== "undefined" &&
    updatesData.description !== user.description
  ) {
    updates.description = updatesData.description.trim();
  }

  if (updatesData.password) {
    updates.password = await bcrypt.hash(updatesData.password, 10);
  }

  if (Object.keys(updates).length === 0) {
    throw createHttpError(400, "No new data provided");
  }

  const updatedUser = await UserCollection.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, select: "-password" },
  );

  return updatedUser;
};
