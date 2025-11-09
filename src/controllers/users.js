import { getAllUsers, getUserById} from '../services/users.js';
import createHttpError from 'http-errors';
import {parsePaginationParams } from '../utils/parsePaginationParams.js';


export const getUsersController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);

    const users = await getAllUsers({
        page,
        perPage,
    })

    res.status(200).json({
        status: 200,
        message: "Successfully found users!",
        data: users,
    });
};


export const getUserByIdController = async (req, res) => {
    const { userId } = req.params;
    const user = await getUserById(userId);

    if (!user) {
        throw createHttpError(404,'User not found')
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found user with id ${userId}!`,
        data: user,
    })
}

