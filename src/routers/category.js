import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllCategoriesController } from '../controllers/category.js';
const router = Router();

router.get('/', ctrlWrapper(getAllCategoriesController));


export default router;
