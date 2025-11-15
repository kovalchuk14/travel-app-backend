import dotenv from 'dotenv';
dotenv.config();

import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import userRouter from './routers/user.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/cloudinary.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

async function bootstrap() {
  try {
    await initMongoConnection();
    console.log('MongoDB connected');

    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);

    const app = setupServer();

    app.use('/api/users', userRouter);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting application:', err);
    process.exit(1);
  }
}

bootstrap();
