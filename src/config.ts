import dotenv from "dotenv";

dotenv.config();

function requiredEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`❌ Missing environment variable: ${name}`);
	}
	return value;
}

export const config = {
	openaiApiKey: requiredEnv("OPENAI_API_KEY"),
	port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
	frontendUrl: process.env.FRONTEND_URL || "http://localhost:4321",
	defaultLanguage: process.env.DEFAULT_LANGUAGE || "en",
	supportedLanguages: process.env.SUPPORTED_LANGUAGES
		? process.env.SUPPORTED_LANGUAGES.split(",").map((l) => l.trim())
		: ["en"],
	defaultLevel: process.env.DEFAULT_LEVEL || "intermediate",
	supportedLevels: process.env.SUPPORTED_LEVELS
		? process.env.SUPPORTED_LEVELS.split(",").map((l) => l.trim())
		: ["beginner", "basic", "intermediate", "advanced", "expert"],
};
