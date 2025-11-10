import { Schema, model } from 'mongoose';

const storiesSchema = new Schema(
  {
    storyImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    favoriteCount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false },
);

export const storiesCollection = model('stories', storiesSchema);
