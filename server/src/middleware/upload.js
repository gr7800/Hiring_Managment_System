import path from "path";
import multer from "multer";

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "src/uploads"));
  },
  filename: (req, file, callback) => {
    const timestamp = Date.now();
    const newFilename = `${timestamp}-${file.originalname}`;
    callback(null, newFilename);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
}).single("resume");

export default upload;
