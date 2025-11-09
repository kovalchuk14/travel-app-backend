import { model, Schema } from 'mongoose';

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false },
);

export const ArticlesCollection = model('Article', articleSchema);
// Made by Yevhenii Feforchenko
