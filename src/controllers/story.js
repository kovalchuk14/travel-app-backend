import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

import {
  getAllStories,
  getStoryById,
  createStory,
  patchStory,
} from '../services/story.js';

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

export const getStoryByIdController = async (req, res, next) => {
  const { storyId } = req.params;

  if (!isValidObjectId(storyId)) {
    return next(createHttpError(400, 'Invalid story ID'));
  }

  const story = await getStoryById(storyId);

  if (!story) {
    return next(createHttpError(404, 'Story not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found story!',
    data: story,
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
