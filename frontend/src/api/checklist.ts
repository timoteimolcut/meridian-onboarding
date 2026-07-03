import API_BASE_URL from "./client";
import type { ChecklistTask } from "./types";

// create 
export async function createTask(task: Omit<ChecklistTask, "id">): Promise<ChecklistTask> {
  const response = await fetch(`${API_BASE_URL}/checklist/`, {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(task),
  });
  if (!response.ok){
    throw new Error("Failed to create new employee.")
  }
  return response.json();
}

// read
export async function getTasks(): Promise<ChecklistTask[]> {
  const response = await fetch(`${API_BASE_URL}/checklist/`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}
export async function getTask(taskId: number): Promise<ChecklistTask> {
  const response = await fetch(`${API_BASE_URL}/checklist/${taskId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

// update
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
// delete
export async function deleteTask(taskId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/checklist/${taskId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}