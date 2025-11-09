import { storiesCollection } from '../db/models/story.js';

export const createStory = async (payload) => {
  const story = await storiesCollection.create(payload);
  return story;
};
