import express from "express";
import verifyNGO from "../../middlewares/ngoAuth.middleware";
import { pickAProblem, viewProblemById, viewProblems } from "../../controllers/ngo.controllers/problem.controller";

const router = express.Router();

router.get("/problem-repository", verifyNGO, viewProblems);
router.get("/problem-repository/:id", verifyNGO, viewProblemById);
router.patch("/pick-a-problem/:id", verifyNGO, pickAProblem);

export default router;