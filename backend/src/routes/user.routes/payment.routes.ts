import express from "express";
import { payFund, verifyPayment } from "../../controllers/user.controller/payment.controller";
import verifyUser from "../../middlewares/userAuth.middleware";

const router = express.Router();

router.post("/pay-funds", verifyUser, payFund);
router.post("/verify-payment", verifyUser, verifyPayment);

export default router;