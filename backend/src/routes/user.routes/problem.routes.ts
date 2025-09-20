import express from "express";
import verifyUser from "../../middlewares/userAuth.middleware";
import { postProblem, viewMyProblems, viewProblemById, viewProblems } from "../../controllers/user.controller/problem.controller";

const router = express.Router();

router.post("/post-problem", verifyUser, postProblem);
router.get("/problem-repository", verifyUser, viewProblems);
router.get("/problem-repository/:id", verifyUser, viewProblemById);
router.get("/get-my-problems", verifyUser, viewMyProblems);
router.get("/my-problem/:id", verifyUser, viewProblemById);

export default router;