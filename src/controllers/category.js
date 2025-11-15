import { getAllCategories } from "../services/category.js";
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
