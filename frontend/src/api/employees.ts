import API_BASE_URL from "./client";
import type { Employee } from "./types";

export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(`${API_BASE_URL}/employees/`);
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
}