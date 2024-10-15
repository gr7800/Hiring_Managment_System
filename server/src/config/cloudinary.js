import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export const uploadToCloudinary = async (req, publicId) => {
  configureCloudinary();
  try {
    const options = {
      folder: "resume",
      resource_type: "raw",
      use_filename: true,
      unique_filename: false,
    };

    if (publicId) {
      options.public_id = publicId;
    }

    const { secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      options
    );
    
    return secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Error uploading file to Cloudinary");
  }
};
