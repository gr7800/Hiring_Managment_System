import express from "express";
import { register, login, getProfile, updateProfile } from "../controllers/userController.js"; 
import { authMiddleware } from "../middleware/authMiddleware.js"; 
import upload from "../middleware/upload.js"; 

const router = express.Router();

router.post("/register", upload, register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, upload, updateProfile);

export default router;
