import express from "express";
import verifyGovt from "../../middlewares/govtAuth.middleware";
import { getCommunityDetails, getMyCommunities, getOpenCommunities, getOpenCommunityDetails, joinOpenCommunity, sendMessageToCommunity, sendMessageToOpenCommunity } from "../../controllers/govt.controllers/community.controller";

const router = express.Router();

router.post("/send-message/:id", verifyGovt, sendMessageToCommunity);
router.get("/get-community/:id", verifyGovt, getCommunityDetails);
router.get("/my-communities", verifyGovt, getMyCommunities);
router.get("/open-communities", verifyGovt, getOpenCommunities);
router.post("/open-communities/join/:id", verifyGovt, joinOpenCommunity);
router.get("/open-community/:id", verifyGovt, getOpenCommunityDetails);
router.post("/open-community/send-message/:id", verifyGovt, sendMessageToOpenCommunity);

export default router;