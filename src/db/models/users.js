import mongoose, { model, Schema } from 'mongoose';


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        required: true,
    },
    articlesAmount: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required:true,
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'articles',
    }],
 },
    {
        timestamps: true,
        versionKey: false
    },
);


export const UserCollection = model('users', userSchema);
