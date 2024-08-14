import express from "express";
import {
  getDocument,
  togglePrivancy,
  uploadDocuments,
} from "../controllers/document";
import authMiddleware from "../middleware/auth";
import upload from "../middleware/upload";
import { getAllDocuments } from "../controllers/document";
import { searchDocuments } from "../controllers/document";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.array("documents"),
  uploadDocuments
);
router.get("/search/:name", authMiddleware, searchDocuments);
router.post("/toggle/:docId", authMiddleware, togglePrivancy);
router.get("/my", authMiddleware, getAllDocuments);
router.get("/:docId", getDocument);

export default router;
