import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    registerUserSchema,
    loginUserSchema,
 } from '../validation/auth.js';
import {
    registerUserController,
    loginUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController),);

router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);


export default router;
