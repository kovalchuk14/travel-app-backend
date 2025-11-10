import cloudinary from '../utils/cloudinary.js';
import { UsersCollection } from '../db/models/user.js';

export const updateAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'avatars', resource_type: 'image' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );
        stream.end(fileBuffer);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const updatedUser = await UsersCollection.findByIdAndUpdate(
      req.user.id,
      { avatarUrl: result.secure_url },
      { new: true },
    );

    res.status(200).json({
      status: 200,
      message: 'Avatar updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
