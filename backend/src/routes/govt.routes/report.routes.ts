import express from "express";
import verifyGovt from "../../middlewares/govtAuth.middleware";
import { generateReport, getReportById } from "../../controllers/govt.controllers/report.controller";

const router = express.Router();

router.post("/generate-report/:id", verifyGovt, generateReport);
router.get("/get-report/:id", verifyGovt, getReportById);

export default router;