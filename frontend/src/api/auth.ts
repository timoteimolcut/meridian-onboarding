import API_BASE_URL from "./client";
import type { Employee } from "./types";

export interface AuthResponse {
  access_token: string;
  token_type: string;
  role: string;
}

export async function login(username: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Invalid username or password");
  }
  return response.json();
}

export async function signup(data: {
  username: string;
  password: string;
  name: string;
  department: string;
  role: string;
  slack_handle?: string;
  email?: string;
}): Promise<{ id: number; username: string; role: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Signup failed");
  }
  return response.json();
}

export async function getMe(token: string): Promise<Employee> {
  const response = await fetch(`${API_BASE_URL}/auth/me?token=${token}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  return response.json();
}