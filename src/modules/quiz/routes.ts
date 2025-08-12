import { Router } from "express";
import { getQuiz, verifyQuiz } from "./controller";
import { validateQuizParams } from "./middleware";

const router = Router();

// POST /api/quiz
// Body: { "topic": "history", "language": "es", "level": "intermediate" }
router.post("/", validateQuizParams, getQuiz);

router.post("/verify", verifyQuiz);

export default router;
