import {UserCollection } from '../db/models/user.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';



export const getAllUsers = async ({
    page = 1,
    perPage = 10,
}) => {

    const skip =  (page - 1) * perPage;

    const [users, usersCount] = await Promise.all([
        UserCollection.find()
            .skip(skip)
            .limit(perPage),
        UserCollection.countDocuments(),
    ]);

    const paginationData = calculatePaginationData(usersCount, perPage, page);

    return {
        data: users,
        ...paginationData,
    };
};


export const getUserById = async (userId) => {
    const user = await UserCollection.findById(userId).populate('savedArticles');

    return user;
}
