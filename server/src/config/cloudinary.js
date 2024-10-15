import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadToCloudinary = async (req) => {
  configureCloudinary();
  try {
    const options = {
      folder: "resume",
      resource_type: "raw",
      use_filename: true,
      unique_filename: false,
    };

    const cloudnaryres = await cloudinary.uploader.upload(
      req.file.path,
      options
    );
    fs.unlinkSync(req.file.path);

    return cloudnaryres?.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Error uploading file to Cloudinary");
  }
};

export const deleteFromCloudanary = async (publicId) => {
  configureCloudinary();
  try {
    const fullPublicId = `resume/${publicId}`;
    
    let res = await cloudinary.uploader.destroy(fullPublicId, {
      resource_type: "raw" 
    });
    
    // console.log(res, "File deletion response");
    return res.result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Error deleting file from Cloudinary");
  }
};
