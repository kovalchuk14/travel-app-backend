import { UsersCollection } from "../db/models/user.js";

export const getCurrentUser = async () => {
const users = await UsersCollection.find({});
return users;
}

export const getUserById = async (userId) => {
  const user = await UsersCollection.findById(userId);
  return user;
}
