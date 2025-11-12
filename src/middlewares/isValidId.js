import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (req, res, next) => {
    const id = Object.values(req.params)[0];
    if (!isValidObjectId(id)) {
        throw createHttpError(400, 'Invalid ID');
    }
    next();
};
