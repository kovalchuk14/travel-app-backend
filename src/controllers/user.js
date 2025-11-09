import { UsersCollection } from '../models/user.js';

export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, password } = req.body;

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = password;

    const updatedUser = await UsersCollection.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true },
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
