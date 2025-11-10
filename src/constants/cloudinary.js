import path from 'node:path';

export const TEMP_UPLOAD_DIR = path.join(process.cwd());
export const UPLOAD_DIR = path.resolve('uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};
