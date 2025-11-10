import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateUser } from '../controllers/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../schemas/userSchemas.js';

const router = Router();

router.patch(
  '/me',
  authenticate,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUser),
);

export default router;
