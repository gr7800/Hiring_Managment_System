import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
export const uploadToCloudinary = async (req) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "resume",
      resource_type: "raw",
      use_filename: true,
      unique_filename: false,
    });

    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading file to Cloudinary");
  }
};
