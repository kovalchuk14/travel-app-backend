import { registerUser, logoutUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    return res.status(401).json({ message: 'No active session' });
  }

  await logoutUser(sessionId);

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(200).json({ message: 'Logout successful' });
};
