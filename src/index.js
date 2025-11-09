import dotenv from 'dotenv';
dotenv.config();

import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import userRouter from './routes/user.js';

async function bootstrap() {
  try {
    await initMongoConnection();
    console.log('MongoDB connected');

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
