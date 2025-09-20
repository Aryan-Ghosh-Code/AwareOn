import express from "express";
import verifyUser from "../../middlewares/userAuth.middleware";
import { getReportById } from "../../controllers/user.controller/report.controller";

const router = express.Router();

router.get("/get-report/:id", verifyUser, getReportById);

export default router;