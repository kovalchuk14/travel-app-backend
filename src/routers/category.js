import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllCategoriesController,getCategoryByIdController } from '../controllers/category.js';
const router = Router();

router.get('/', ctrlWrapper(getAllCategoriesController));
router.get('/:categoryId', ctrlWrapper(getCategoryByIdController));


export default router;
