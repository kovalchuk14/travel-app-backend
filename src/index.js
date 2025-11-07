import { setupServer } from './serverTest.js';
import { initMongoConnection } from './db/initMongoConnection.js';

async function bootstrap() {
  await initMongoConnection();
  setupServer();
}

bootstrap();
