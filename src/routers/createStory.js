import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { createStorySchema } from '../../validation/stories.js';
import { createStoryController } from '../controllers/createStoryController.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.post(
  '/api/stories',
  upload.single('storyImage'),
  validateBody(createStorySchema),
  ctrlWrapper(createStoryController),
);

export default router;
