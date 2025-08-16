import express from "express";
import cors from "cors";
import { config } from "./config";
import quizRoutes from "./modules/quiz/routes";

const app = express();

// CORS configuration
app.use(
	cors({
		origin: config.frontendUrl, // Allow requests from frontend
		credentials: true, // Allow cookies and authentication headers
		methods: ["POST", "OPTIONS"], // Allowed HTTP methods
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allowed headers
	})
);

app.use(express.json());
app.use("/api/quiz", quizRoutes);

export default app;
