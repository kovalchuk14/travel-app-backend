import { getUserById, getAllUsers } from '../services/users.js';
import {parsePaginationParams } from '../utils/parsePaginationParams.js';


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
    })

    res.status(200).json({
        status: 200,
        message: "Successfully found users!",
        data: users,
    });
};
