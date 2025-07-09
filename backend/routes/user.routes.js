import { Router } from "express";
import {
  addNewCandidate,
  getAllCandidates,
  updateCandidateStatus,
  deleteCandidate,
} from "../controllers/candidates.controller.js";
const router = Router();
router
  .post("/candidates", addNewCandidate)
  .get("/candidates", getAllCandidates)
  .put("/candidates/:id/status", updateCandidateStatus)
  .delete("/candidates/:id", deleteCandidate);
export default router;
