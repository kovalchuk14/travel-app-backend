import createHttpError from "http-errors";
import { getAllCategories,getCategoryById } from "../services/category.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";


export const getAllCategoriesController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const categories = await getAllCategories({
        page,
        perPage,
    });

    res.status(200).json({
        status: 200,
        message: 'Successfully found categories!',
        data: categories,
    });
}

export const getCategoryByIdController = async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await getCategoryById(categoryId);
    if (!category) {
        return next(createHttpError(404, 'Category not found'))
    }

    res.status(200).json({
        status: 200,
        message: 'Successfully found category',
        data: category,
    });
}
