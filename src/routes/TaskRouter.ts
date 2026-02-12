import {Router} from "express";
import { getAllTasks, createTodoTask } from "../controllers/TaskController";

const TaskRouter = Router();
TaskRouter.get("/tasks", getAllTasks);
TaskRouter.post("/tasks", createTodoTask);
export default TaskRouter;
