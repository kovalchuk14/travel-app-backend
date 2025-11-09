import { getUserById, getCurrentUser  } from '../models/user.js';

export const getCurrentUserController = async (req, res) => {
    const user = await getCurrentUser();
    
  res.json({
    status: 200,
    message: 'Successfully found user!',
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
}
