import express from "express";
import verifyGovt from "../../middlewares/govtAuth.middleware";
import { getMyMinistries, onboardMinistry } from "../../controllers/govt.controllers/onboarding.controller";

const router = express.Router();

router.post("/register-ministry", verifyGovt, onboardMinistry);
router.get("/my-ministries", verifyGovt, getMyMinistries);

export default router;