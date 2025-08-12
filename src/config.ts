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
	port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
	defaultLanguage: process.env.DEFAULT_LANGUAGE || "en",
	supportedLanguages: process.env.SUPPORTED_LANGUAGES
		? process.env.SUPPORTED_LANGUAGES.split(",").map((l) => l.trim())
		: ["en"],
};
