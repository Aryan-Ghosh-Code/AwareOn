import express from "express";
import { getProjectById, getProjects } from "../../controllers/user.controller/project.controller";
import verifyUser from "../../middlewares/userAuth.middleware";

const router = express.Router();

router.get("/project-repository", verifyUser, getProjects);
router.get("/project-repository/:id", verifyUser, getProjectById);

export default router;