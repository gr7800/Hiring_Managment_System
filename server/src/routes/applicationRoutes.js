import express from "express";
import {
  applyToJob,
  getApplicationsForJob,
  updateApplicationStatus,
  getApplicationDetails,
} from "../controllers/applicationController.js";
import { authMiddleware, verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/:jobId/apply",
  authMiddleware,
  verifyRole(["Applicant", "HR"]),
  applyToJob
);

router.get(
  "/:jobId/applications",
  authMiddleware,
  verifyRole(["HR", "Manager"]),
  getApplicationsForJob
);

router.put(
  "/:applicationId/status",
  authMiddleware,
  verifyRole(["HR", "Manager"]),
  updateApplicationStatus
);

router.get("/:applicationId", authMiddleware, getApplicationDetails);

export default router;
