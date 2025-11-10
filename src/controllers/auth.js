import { registerUser, loginUser, logoutUser, createSession} from '../services/auth.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
import { SessionsCollection } from '../db/models/session.js';
import { refreshUsersSession } from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
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
    data: user,
  });
};


export const logoutUserController = async (req, res) => {
  if(req.cookies.sessionId){
    await logoutUser(req.cookies.sessionId);
  }

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
  });
};
