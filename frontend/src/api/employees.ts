import API_BASE_URL from "./client";
import type { Employee } from "./types";

// Create
export async function createEmployee(employee: Omit<Employee, "id">): Promise<Employee> {
  const response = await fetch(`${API_BASE_URL}/employees/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error("Failed to create employee");
  }
  return response.json();
}

// Read
export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(`${API_BASE_URL}/employees/`);
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
}
export async function getEmployee(employeeId: number): Promise<Employee> {
  const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }
  return response.json();
}
// Update
export async function updateEmployee(employeeId: number, employee: Partial<Employee>): Promise<Employee> {
  const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!response.ok){
    throw new Error("Failed to update employee.");
  }
  return response.json();
}
// Delete
export async function deleteEmployee(employeeId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
    method: "DELETE",
  });
  if(!response.ok) {
    throw new Error("Failed to delete employee");
  }
}