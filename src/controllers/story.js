import createHttpError from 'http-errors';

import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

import { createStory } from '../services/story.js';
import { getAllStories } from '../services/story.js';
import { getUserStories } from '../services/story.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAllStoriesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const stories = await getAllStories({ page, perPage });

  res.status(200).json({
    status: 200,
    message: 'Successfully found stories!',
    data: stories,
  });
};

export const getUserStoriesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const stories = await getUserStories({ userId: req.user._id, page, perPage });

  res.status(200).json({
    status: 200,
    message: 'Successfully found stories!',
    data: stories,
  });
};

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
