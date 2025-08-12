import OpenAI from "openai";
import { config } from "../../config";

const openai = new OpenAI({
	apiKey: config.openaiApiKey,
});

export const generateQuiz = async (
	topic: string,
	level: string,
	language: string
) => {
	const prompt = `
Generate a quiz with between 10 and 15 questions about the following topic: ${topic}.
Language: ${language}.
Difficulty level: ${level}.

Return ONLY a JSON object with the structure:

{
  "topic": "Received topic",
  "questions": [
    {
      "id": 1,
      "question": "Question text",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ]
    }
  ]
}

Rules:
- Questions and options must be in ${language}.
- Exactly 4 options per question.
- IDs must be numeric and sequential starting from 1.
- NO explanations, NO correct answers included.
- Return compact JSON with no extra text or line breaks.
`;

	const completion = await openai.chat.completions.create({
		model: "gpt-5-nano",
		messages: [{ role: "user", content: prompt }],
	});

	const content = completion.choices[0]?.message?.content || "{}";
	return JSON.parse(content);
};
