import express from "express";
import verifyGovt from "../../middlewares/govtAuth.middleware";
import { createProject, getMyProjects, getProjectById, getProjects, getSuggestions } from "../../controllers/govt.controllers/project.controller";

const router = express.Router();

router.post("/create-project", verifyGovt, createProject);
router.get("/project-repository", verifyGovt, getProjects);
router.get("/my-projects", verifyGovt, getMyProjects);
router.get("/project-repository/:id", verifyGovt, getProjectById);
router.get("/suggestions/:id", verifyGovt, getSuggestions);

export default router;