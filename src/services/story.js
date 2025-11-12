import { storiesCollection } from '../db/models/story.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const createStory = async (payload) => {
  const story = await storiesCollection.create(payload);
  return story;
};

export const getAllStories = async ({
  userId,
  filter = {},
  page = 1,
  perPage = 9,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const userFilter = userId ? { userId } : {};

  const storiesQuery = storiesCollection
    .find(userFilter)
    .populate('category', 'name')
    .populate('userId', 'name avatarUrl');

  if (filter.category) {
    storiesQuery.where('category').equals(filter.category);
  }

  const [storiesCount, stories] = await Promise.all([
    storiesCollection.countDocuments(storiesQuery.getQuery()),
    storiesQuery.skip(skip).limit(limit).sort({ favoriteCount: -1 }).exec(),
  ]);

  const paginationData = calculatePaginationData(storiesCount, perPage, page);

  return {
    data: stories,
    ...paginationData,
  };
};

export const getStoryById = async (storyId) => {
  const story = await storiesCollection
    .findById(storyId)
    .populate('category')
    .populate('userId', 'name avatarUrl');
  return story;
};

export const patchStory = async (payload) => {

    const { storyId, userId, ...updateFields } = payload;

    const updatedStory = await storiesCollection.findOneAndUpdate(
        { _id: storyId, ownerId: userId },
        updateFields,
        { new: true }
    );

    return updatedStory;

};
