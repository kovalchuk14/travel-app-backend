import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';

import { createStorySchema, updateStorySchema } from '../validation/stories.js';
import {
  createStoryController,
  patchStoryController,
} from '../controllers/story.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { isValidId } from '../middlewares/isValidStoryId.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  upload.single('storyImage'),
  validateBody(createStorySchema),
  ctrlWrapper(createStoryController),
);

router.patch(
  '/:storyId',
  isValidId,
  upload.single('storyImage'),
  validateBody(updateStorySchema),
  ctrlWrapper(patchStoryController),
);
export default router;
