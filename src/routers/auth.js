import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController, logoutUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
const router = Router();

router.post('/register',validateBody(registerUserSchema),ctrlWrapper(registerUserController),);
router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
