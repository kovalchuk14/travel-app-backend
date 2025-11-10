import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
<<<<<<< HEAD
import { createStorySchema } from '../validation/stories.js';
import { createStoryController } from '../controllers/story.js';
import { getAllStoriesController } from '../controllers/story.js';
import { getUserStoriesController } from '../controllers/story.js';
=======

import { createStorySchema, updateStorySchema } from '../validation/stories.js';
import { createStoryController, patchStoryController } from '../controllers/story.js';

>>>>>>> origin/main

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';
<<<<<<< HEAD

const router = Router();

router.get('/', ctrlWrapper(getAllStoriesController));

router.get('/me', authenticate, ctrlWrapper(getUserStoriesController));
=======
import { IsVaildId } from '..middlewares/IsVaildId';


const router = Router();

router.use(authenticate);
>>>>>>> origin/main

router.post(
  '/',
  upload.single('storyImage'),
  validateBody(createStorySchema),
  ctrlWrapper(createStoryController),
);

<<<<<<< HEAD
=======

router.patch(
  '/:storyId',
  IsVaildId,
  upload.single('storyImage'),
  validateBody(updateStorySchema),
  ctrlWrapper(patchStoryController),
)
>>>>>>> origin/main
export default router;
