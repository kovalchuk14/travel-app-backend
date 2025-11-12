import { Schema, model } from 'mongoose';

const storiesSchema = new Schema(
  {
    img: { type: String, required: true },
    title: { type: String, required: true },
    article: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: String, required: true },

    favoriteCount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false },
);

export const storiesCollection = model('stories', storiesSchema);
