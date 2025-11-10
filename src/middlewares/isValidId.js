
import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (req, res, next) => {
    const { objectId } = req.params;
    if (!isValidObjectId(objectId)) {
        throw createHttpError(400, 'Bad Request')
    };
    next();
}
