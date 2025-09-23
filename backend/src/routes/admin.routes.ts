import express from 'express';
import { addMembers, checkRazorpayAccount, checkVirtualAccounts, createCommunity, createOpenCommunities, createTier, getToken, populateCommunity, sendSMS } from '../controllers/admin.controller';
import verifyAdmin from '../middlewares/admin.middleware';

const router = express.Router();

router.post("/get-token", getToken);
router.post("/send-sms", verifyAdmin, sendSMS);
//router.post("/send-sms-2", verifyAdmin, sendSMS2);
router.get("/rpx-virtual-accounts", verifyAdmin, checkVirtualAccounts);
router.get("/rpx-check-accounts", verifyAdmin, checkRazorpayAccount);
router.post("/create-tiers", verifyAdmin, createTier);
router.post("/add-members", verifyAdmin, addMembers);
router.post("/create-communities", verifyAdmin, createCommunity);
router.post('/populate-community/:tierId', verifyAdmin, populateCommunity);
router.post("/create-open-communities", verifyAdmin, createOpenCommunities);

export default router;