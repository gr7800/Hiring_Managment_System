import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "../uploads"));
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
