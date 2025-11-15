import {
  registerUser,
  loginUser,
  logoutUser,
  createSession,
} from '../services/auth.js';
import { SessionsCollection } from '../db/models/session.js';
import { refreshUsersSession } from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    expires: session.accessTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);
  await SessionsCollection.deleteMany({ userId: user._id });

  const newSession = await createSession(user._id);
  setupSession(res, newSession);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      user,
      session: {
        accessToken: newSession.accessToken,
        refreshToken: newSession.refreshToken,
        expiresAt: newSession.accessTokenValidUntil,
      },
    },
  });
};

export const logoutUserController = async (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.status(400).json({ message: 'No session to logout' });
  }

  await logoutUser(sessionId);

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: session,
  });
};
