import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';

import {
  getAllStoriesController,
  getStoryByIdController,
  createStoryController,
  patchStoryController,
} from '../controllers/story.js';
import { createStorySchema, updateStorySchema } from '../validation/stories.js';


import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

import { isValidId } from '../middlewares/isValidStoryId.js';
import { authenticateOptional } from '../middlewares/authenticateOptional.js';


const router = Router();

router.get('/', authenticateOptional, ctrlWrapper(getAllStoriesController));

router.get('/:storyId', ctrlWrapper(getStoryByIdController));

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
  isValidId,
  upload.single('storyImage'),
  validateBody(updateStorySchema),
  ctrlWrapper(patchStoryController),
);

export default router;
