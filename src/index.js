import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/cloudinary.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

async function bootstrap() {
  await initMongoConnection();

  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);

  setupServer();
}

bootstrap();
