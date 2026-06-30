import API_BASE_URL from "./client";
import type { ChecklistTask } from "./types";

export async function getTasks(): Promise<ChecklistTask[]> {
  const response = await fetch(`${API_BASE_URL}/checklist/`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

export async function updateTaskStatus(taskId: number, isCompleted: boolean): Promise<ChecklistTask> {
  const response = await fetch(`${API_BASE_URL}/checklist/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_completed: isCompleted }),
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return response.json();
}