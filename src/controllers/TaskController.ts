import { Request, Response } from "express";
import { createTask, fetchAllTasks } from "../services/TaskService";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await fetchAllTasks();
    return res.status(200).json(tasks);
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to fetch tasks",error: error.message, });
  }
};

export const createTodoTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
     if (!title || !description) {
         return res.status(400).json({message: "Title and description are required"});
     }
    const task = await createTask({title,description, status});
    return res.status(200).json({message: "Task created successfully"});
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to create tasks",error: error.message, });
  }
};
