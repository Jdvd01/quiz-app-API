import { Request, Response } from "express";
import { generateQuiz } from "./service";

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
