import { Router } from 'express';
import { updateUser } from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.patch('/me', authenticate, updateUser);

export default router;
