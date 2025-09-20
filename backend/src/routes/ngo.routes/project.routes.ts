import express from "express";
import verifyNGO from "../../middlewares/ngoAuth.middleware";
import { createProject, getMyProjects, getProjectById, getProjects, getSuggestions } from "../../controllers/ngo.controllers/project.controller";

const router = express.Router();

router.post("/create-project", verifyNGO, createProject);
router.get("/project-repository", verifyNGO, getProjects);
router.get("/my-projects", verifyNGO, getMyProjects);
router.get("/project-repository/:id", verifyNGO, getProjectById);
router.get("/suggestions/:id", verifyNGO, getSuggestions);

export default router;