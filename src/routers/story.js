import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';

import { getAllStoriesController } from '../controllers/story.js';
import { createStorySchema, updateStorySchema } from '../validation/stories.js';
import {
  createStoryController,
  patchStoryController,
} from '../controllers/story.js';
import { IsVaildId } from '../middlewares/IsValidId.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authenticateOptional } from '../middlewares/authenticateOptional.js';

import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/', authenticateOptional, ctrlWrapper(getAllStoriesController));

router.post(
  '/',
  authenticate,
  upload.single('storyImage'),
  validateBody(createStorySchema),
  ctrlWrapper(createStoryController),
);

router.patch(
  '/:storyId',
  authenticate,
  IsVaildId,
  upload.single('storyImage'),
  validateBody(updateStorySchema),
  ctrlWrapper(patchStoryController),
);

export default router;
