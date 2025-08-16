import { Request, Response } from "express";
import { generateQuiz, verifyAnswers } from "./service";

export async function getQuiz(req: Request, res: Response) {
	try {
		const { topic, level, language } = req.body;

		const quiz = await generateQuiz(topic, level, language);
		res.json(quiz);
	} catch (error: any) {
		console.error("❌ Error generating quiz:", error);
		res.status(500).json({ error: "Failed to generate quiz" });
	}
}

export async function verifyQuiz(req: Request, res: Response) {
	try {
		const { questions, userAnswers } = req.body;

		if (!questions || !userAnswers) {
			return res.status(400).json({ error: "Missing parameters" });
		}

		const results = await verifyAnswers(questions, userAnswers);

		const total = results.length;
		const correctCount = results.filter(
			(r: Record<string, any>) => r.isCorrect
		).length;
		const incorrectCount = total - correctCount;
		const percentage = total > 0 ? (correctCount / total) * 100 : 0;

		console.log("response");

		res.json({
			total,
			correct: correctCount,
			incorrect: incorrectCount,
			percentage: Number(percentage.toFixed(2)),
			results,
		});
	} catch (error: any) {
		console.error("❌ Error verifying quiz:", error);
		res.status(500).json({ error: "Failed to verify quiz" });
	}
}
