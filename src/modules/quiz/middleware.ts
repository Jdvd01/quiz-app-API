import { Request, Response, NextFunction } from "express";
import { config } from "../../config";

const defaultLanguage = config.defaultLanguage.toLowerCase();
const defaultLevel = config.defaultLevel.toLowerCase();

function capitalizeWords(str: string): string {
	return str
		.split(" ")
		.filter(Boolean) // remove empty strings from multiple spaces
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
}

export function validateQuizParams(
	req: Request,
	res: Response,
	next: NextFunction
) {
	let topic = req.body.topic?.trim();
	let language = req.body.language?.trim().toLowerCase() || defaultLanguage;
	let level = req.body.level?.trim().toLowerCase() || defaultLevel;

	if (!topic) {
		return res.status(400).json({ error: "Missing 'topic' in request body" });
	}

	if (
		!config.supportedLanguages.map((l) => l.toLowerCase()).includes(language)
	) {
		return res.status(400).json({
			error: `Unsupported language '${language}'. Supported languages are: ${config.supportedLanguages.join(
				", "
			)}`,
		});
	}

	if (!config.supportedLevels.map((l) => l.toLowerCase()).includes(level)) {
		return res.status(400).json({
			error: `Unsupported level '${level}'. Supported levels are: ${config.supportedLevels.join(
				", "
			)}`,
		});
	}

	topic = capitalizeWords(topic);
	req.body.topic = topic;
	req.body.language = language;
	req.body.level = level;

	next();
}
