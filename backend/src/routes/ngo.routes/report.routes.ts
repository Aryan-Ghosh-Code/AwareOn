import express from "express";
import verifyNGO from "../../middlewares/ngoAuth.middleware";
import { generateReport, getReportById } from "../../controllers/ngo.controllers/report.controller";

const router = express.Router();

router.post("/generate-report/:id", verifyNGO, generateReport);
router.get("/get-report/:id", verifyNGO, getReportById);

export default router;