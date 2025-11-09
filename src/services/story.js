import { storiesCollection } from '../db/models/story.js';

export const createStory = async (payload) => {
  const story = await storiesCollection.create(payload);
  return story;
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
        }
    );

    if (!rawResult || !rawResult.value) return null;

    return rawResult.value;
}
