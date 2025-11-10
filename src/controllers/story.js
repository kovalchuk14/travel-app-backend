import createHttpError from 'http-errors';

import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

import { createStory, patchStory } from '../services/story.js';
import { getAllStories } from '../services/story.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllStoriesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);

  let stories;

  // На фронтенді:
  // Сторінка «всі історії» → робить GET /stories
  // Сторінка «мої історії» → робить GET /stories?mine=true

  if (req.query.mine === 'true' && req.user?._id) {
    stories = await getAllStories({
      userId: req.user._id,
      filter,
      page,
      perPage,
    });
  } else {
    stories = await getAllStories({ filter, page, perPage });
  }

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
    ...req.body,
    storyImage: imageUrl,
    userId: req.user._id,
  };

  const story = await patchStory(payload);

  if (!story) {
    next(createHttpError(404, 'Story not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a story!',
    data: story,
  });
};
