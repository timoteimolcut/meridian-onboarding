import API_BASE_URL from "./client";
import type { Resource } from "./types";

export async function getResources(): Promise<Resource[]> {
  const response = await fetch(`${API_BASE_URL}/resources/`);
  if (!response.ok) {
    throw new Error("Failed to fetch resources");
  }
  return response.json();
}

