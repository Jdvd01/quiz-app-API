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
The questions should be adapted to the difficulty level: ${level}.
Return the response ONLY in JSON format following exactly this structure:

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
- All questions and options must be written in ${language}.
- Do NOT include any text outside the JSON.
- Do NOT include the correct answers or explanations.
- Each question must have exactly 4 options.
- Use incremental IDs starting at 1.
`;

	const completion = await openai.chat.completions.create({
		model: "gpt-5-nano",
		messages: [{ role: "user", content: prompt }],
	});

	const content = completion.choices[0]?.message?.content || "{}";
	return JSON.parse(content);
};
