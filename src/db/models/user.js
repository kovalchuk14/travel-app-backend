import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    avatarPublicId: { type: String },
    articlesAmount: { type: Number, default: 0 },
    description: { type: String, default: '' },
    savedArticles: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
  },
  { timestamps: true },
);
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const UserCollection = model('User', userSchema);

