import express from "express";
import verifyNGO from "../../middlewares/ngoAuth.middleware";
import { getCommunityDetails, getMyCommunities, getOpenCommunities, getOpenCommunityDetails, joinOpenCommunity, sendMessageToCommunity, sendMessageToOpenCommunity } from "../../controllers/ngo.controllers/community.controller";

const router = express.Router();

router.post("/send-message/:id", verifyNGO, sendMessageToCommunity);
router.get("/get-community/:id", verifyNGO, getCommunityDetails);
router.get("/my-communities", verifyNGO, getMyCommunities);
router.get("/open-communities", verifyNGO, getOpenCommunities);
router.post("/open-communities/join/:id", verifyNGO, joinOpenCommunity);
router.get("/open-community/:id", verifyNGO, getOpenCommunityDetails);
router.post("/open-community/send-message/:id", verifyNGO, sendMessageToOpenCommunity);

export default router;