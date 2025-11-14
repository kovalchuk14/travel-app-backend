import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/cloudinary.js';

cloudinary.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});


const uploadFile = async (file, folder = '') => {
  const response = await cloudinary.uploader.upload(file.path, { folder });
  await fs.unlink(file.path);
  return {
    secureUrl: response.secure_url,
    publicId: response.public_id,
  };
};


const deleteFile = async (publicId) => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
};

export default { uploadFile, deleteFile };
