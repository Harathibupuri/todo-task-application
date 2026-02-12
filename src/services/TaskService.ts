import Task from "../models/Task";
import { TaskType } from "../types/TaskType";
export const fetchAllTasks = async () => {
  try {
    return await Task.findAll();
  } catch (error) {
    throw new Error("Server error at fetching tasks");
  }
};
export const createTask = async (data: Partial<TaskType>) => {
  try {
    const task = await Task.create(data);
    return task;
  } catch (error) {
    throw new Error("Server error at creating task");
  }
};
