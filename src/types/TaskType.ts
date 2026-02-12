export interface TaskType {
  title: string;
  description: string;
  status?: "pending" | "in_progress" | "completed";
}