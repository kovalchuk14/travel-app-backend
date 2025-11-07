import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

import { createStory } from '../services/createStory.js';

export const createStoryController = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      throw createHttpError(401, 'User not authenticated');
    }

    const photo = req.file;

    let photoUrl;
    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }
    const payload = {
      ...req.body,
      storyImage: photoUrl,
      userId: req.user._id,
    };

    const story = await createStory(payload);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a story!',
      data: story,
    });
  } catch (err) {
    next(createHttpError(500, err.message));
  }
};
