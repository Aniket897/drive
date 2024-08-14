import express from "express";
const router = express.Router();
import authRouter from "./auth";
import documentRouter from "./document";

router.use("/auth", authRouter);
router.use("/document", documentRouter);

export default router;
