import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
// Upload a single buffer
export const uploadToCloudinary = (fileBuffer, options) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
            if (err)
                return reject(err);
            resolve(result);
        });
        stream.end(fileBuffer);
    });
};
export default cloudinary;
//# sourceMappingURL=cloudinary.js.map