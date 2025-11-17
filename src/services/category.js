import { CategoryCollection } from "../db/models/category.js";
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllCategories = async ({ page, perPage}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const [categories, categoriesCount] = await Promise.all([
        CategoryCollection.find()
            .skip(skip)
            .limit(limit).lean(),
        CategoryCollection.countDocuments(),
    ]);

    const paginationData = calculatePaginationData(categoriesCount, perPage, page);

    return {
        data: categories,
        ...paginationData,
    };
}

export const getCategoryById = async (categoryId) => {
    return CategoryCollection.findById(categoryId);
}
