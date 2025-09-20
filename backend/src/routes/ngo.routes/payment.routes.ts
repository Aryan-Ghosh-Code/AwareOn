import express from "express";
import { onboardUser, payFund, verifyPayment } from "../../controllers/ngo.controllers/payment.controller";
import verifyNGO from "../../middlewares/ngoAuth.middleware";

const router = express.Router();

router.post("/pay-funds", verifyNGO, payFund);
router.post("/onboarding", verifyNGO, onboardUser);
// router.post("/create-payout", verifyGovt, createPayout);
router.post("/verify-payment", verifyNGO, verifyPayment);

export default router;