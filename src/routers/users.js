import { Router } from 'express';
import {ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUsersController, getUserByIdController } from '../controllers/users.js';
import {isValidId } from '../middlewares/isValidId.js';


const router = Router();

router.get('/', ctrlWrapper(getUsersController))

router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController))

export default router;
