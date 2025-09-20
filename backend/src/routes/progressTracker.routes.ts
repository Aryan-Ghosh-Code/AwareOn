import express from "express";
import { getStats } from "../controllers/progressTracker.controller";

const router = express.Router();

router.get("/get-stats", getStats);

export default router;