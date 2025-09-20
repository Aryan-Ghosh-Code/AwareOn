import express from "express";
import { updateProfile } from "../../controllers/user.controller/profile.controller";
import verifyUser from "../../middlewares/userAuth.middleware";

const router = express.Router();

router.patch("/update", verifyUser, updateProfile);

export default router;