import express from "express";
import TaskRouter from "./routes/TaskRouter";

const app = express();
app.use(express.json());
app.use(TaskRouter);

export default app;