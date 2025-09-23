import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
import type { UploadApiOptions, UploadApiResponse } from "cloudinary"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.API_KEY!,
    api_secret: process.env.API_SECRET!
})


// Upload a single buffer
export const uploadToCloudinary = (
  fileBuffer: Buffer,
  options?: UploadApiOptions
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (err, result) => {
        if (err) return reject(err);
        resolve(result as UploadApiResponse);
      }
    );

    stream.end(fileBuffer);
  });
};

export default cloudinary;