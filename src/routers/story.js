import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';

import { createStorySchema, updateStorySchema } from '../validation/stories.js';
import { createStoryController, patchStoryController } from '../controllers/story.js';


import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import {authenticate}  from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';
import { IsValidId } from '../middlewares/IsValidId.js';


const router = Router();

// router.use(authenticate);

router.post(
  '/',
  upload.single('storyImage'),
  validateBody(createStorySchema),
  ctrlWrapper(createStoryController),
);


router.patch(
  '/:storyId',
  IsValidId,
  upload.single('storyImage'),
  validateBody(updateStorySchema),
  ctrlWrapper(patchStoryController),
)
export default router;
