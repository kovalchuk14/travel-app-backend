import { SessionsCollection } from '../db/models/session.js';
import { UserCollection } from '../db/models/user.js';

export const authenticateOptional = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) return next();

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];
  if (bearer !== 'Bearer' || !token) return next();

  const session = await SessionsCollection.findOne({ accessToken: token });
  if (!session) return next();

  if (new Date() > new Date(session.accessTokenValidUntil)) return next();

  const user = await UserCollection.findById(session.userId);
  if (!user) return next();

  req.user = user;
  next();
};
