import express from "express";
import quizRoutes from "./modules/quiz/routes";

const app = express();

app.use(express.json());
app.use("/api/quiz", quizRoutes);

export default app;
