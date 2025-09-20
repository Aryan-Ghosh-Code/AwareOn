import express from "express";
import verifyGovt from "../../middlewares/govtAuth.middleware";
import { onboardUser, payFund, verifyPayment } from "../../controllers/govt.controllers/payment.controller";

const router = express.Router();

router.post("/pay-funds", verifyGovt, payFund);
router.post("/onboarding", verifyGovt, onboardUser);
// router.post("/create-payout", verifyGovt, createPayout);
router.post("/verify-payment", verifyGovt, verifyPayment);

export default router;