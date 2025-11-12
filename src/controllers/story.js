import createHttpError from 'http-errors';

import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { createStory, patchStory } from '../services/story.js';


export const createStoryController = async (req, res) => {
  if (!req.user || !req.user._id) {
    throw createHttpError(401, 'User not authenticated');
  }

  const storyImage = req.file;

  let imageUrl;
  if (storyImage) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      imageUrl = await saveFileToCloudinary(storyImage);
    } else {
      imageUrl = await saveFileToUploadDir(storyImage);
    }
  }

  const payload = {
    ...req.body,
    storyImage: imageUrl,
    userId: req.user._id,
  };

  const story = await createStory(payload);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a story!',
    data: story,
  });
};

export const patchStoryController = async (req, res, next) => {
    const { storyId } = req.params;

    if (!req.user || !req.user._id) {
        throw createHttpError(401, 'User not authenticated');
    }

    const storyImage = req.file;
    let imageUrl;

    if (storyImage) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            imageUrl = await saveFileToCloudinary(storyImage);
        } else {
            imageUrl = await saveFileToUploadDir(storyImage);
        }
    }

    const payload = {
        storyId,
        userId: req.user._id,
        ...req.body,
        ...(imageUrl && { storyImage: imageUrl }),
    };

    const updatedStory = await patchStory(payload);

    if (!updatedStory) {
        return next(createHttpError(404, "Story not found or you don't have permission"));
    }

    res.status(200).json({
        status: 200,
        message: 'Successfully updated the story!',
        data: updatedStory,
    });
};
