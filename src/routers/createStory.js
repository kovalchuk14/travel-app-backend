import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { createStorySchema } from '../../validation/stories.js';
import { createStoryController } from '../controllers/createStoryController.js';

import { upload } from '../middlewares/multer.js';

const router = Router();

router.post(
  '/api/stories',
  upload.single('photo'),
  validateBody(createStorySchema),
  createStoryController,
);

export default router;
