import { storiesCollection } from '../db/models/story.js';

export const createStory = async (payload) => {
  const story = await storiesCollection.create(payload);
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
