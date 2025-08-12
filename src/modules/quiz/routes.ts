import { Router } from "express";
import { getQuiz } from "./controller";
import { validateQuizParams } from "./middleware";

const router = Router();

// POST /api/quiz
// Body: { "topic": "history", "language": "es", "level": "intermediate" }
router.post("/", validateQuizParams, getQuiz);

export default router;
