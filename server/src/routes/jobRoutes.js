import express from "express";
import {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById,
  getMyJobs,
} from "../controllers/jobController.js";
import { authMiddleware, verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, verifyRole(["HR", "Manager"]), createJob);
router.put("/:jobId", authMiddleware, verifyRole(["HR", "Manager"]), updateJob);
router.delete(
  "/:jobId",
  authMiddleware,
  verifyRole(["HR", "Manager"]),
  deleteJob
);
router.get("/", getAllJobs);
router.get("/my-jobs", authMiddleware, getMyJobs);
router.get("/singlejob/:jobId", getJobById);

export default router;
