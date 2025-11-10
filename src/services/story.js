import { storiesCollection } from '../db/models/story.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const createStory = async (payload) => {
  const story = await storiesCollection.create(payload);
  return story;
};

export const getAllStories = async ({ userId, page = 1, perPage = 9 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const userFilter = userId ? { userId } : {};

  const storiesQuery = storiesCollection.find(userFilter);
  const storiesCount = await storiesCollection
    .find()
    .merge(storiesQuery)
    .countDocuments();

  const stories = await storiesQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(storiesCount, perPage, page);

  return {
    data: stories,
    ...paginationData,
  };
};

export const patchStory = async (payload) => {
  const { storyId, ...updateFields } = payload;
  const rawResult = await storiesCollection.findOneAndUpdate(
    {
      _id: storyId,
      userId: payload.userId,
    },
    updateFields,
    {
      new: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return rawResult.value;
};
