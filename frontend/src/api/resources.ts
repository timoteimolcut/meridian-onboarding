import API_BASE_URL from "./client";
import type { Resource } from "./types";

// Create
export async function createResource(resource: Omit<Resource, "id">): Promise<Resource> {
  const response = await fetch(`${API_BASE_URL}/resources/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resource),
  });
  if (!response.ok) {
    throw new Error("Failed to create resource");
  }
  return response.json();
}

// Read
export async function getResources(): Promise<Resource[]> {
  const response = await fetch(`${API_BASE_URL}/resources/`);
  if (!response.ok) {
    throw new Error("Failed to fetch resources");
  }
  return response.json();
}

export async function getResource(resourceId: number): Promise<Resource> {
  const response = await fetch(`${API_BASE_URL}/resources/${resourceId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch resource");
  }
  return response.json();
}

// Update
export async function updateResource(resourceId: number, resource: Partial<Resource>): Promise<Resource> {
  const response = await fetch(`${API_BASE_URL}/resources/${resourceId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resource),
  });
  if (!response.ok) {
    throw new Error("Failed to update resource");
  }
  return response.json();
}

// Delete
export async function deleteResource(resourceId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/resources/${resourceId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete resource");
  }
}