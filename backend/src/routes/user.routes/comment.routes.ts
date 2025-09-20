import express from "express";
import verifyUser from "../../middlewares/userAuth.middleware";
import { addComment } from "../../controllers/user.controller/comments.controller";

const router = express.Router();

router.post("/add-comment/:id", verifyUser, addComment);

export default router;