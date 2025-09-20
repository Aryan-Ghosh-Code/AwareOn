import express from "express";
import verifyUser from "../../middlewares/userAuth.middleware";
import { getCommunityDetails, getMyCommunities, getOpenCommunities, getOpenCommunityDetails, joinOpenCommunity, sendMessageToCommunity, sendMessageToOpenCommunity } from "../../controllers/user.controller/community.controller";

const router = express.Router();

router.post("/send-message/:id", verifyUser, sendMessageToCommunity);
router.get("/get-community/:id", verifyUser, getCommunityDetails);
router.get("/my-communities", verifyUser, getMyCommunities);
router.get("/open-communities", verifyUser, getOpenCommunities);
router.post("/open-communities/join/:id", verifyUser, joinOpenCommunity);
router.get("/open-community/:id", verifyUser, getOpenCommunityDetails);
router.post("/open-community/send-message/:id", verifyUser, sendMessageToOpenCommunity);

export default router;