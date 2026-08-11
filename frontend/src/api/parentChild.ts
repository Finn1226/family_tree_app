import type { ParentChild, CreateParentChildInput } from "../types/family";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getParentChildLinks(): Promise<ParentChild[]> {
  const response = await fetch(`${API_BASE_URL}/parent-child/`);

  if (!response.ok) {
    throw new Error("Failed to fetch parent-child links");
  }

  return response.json();
}

export async function createParentChildLink(
  link: CreateParentChildInput,
): Promise<ParentChild> {
  const response = await fetch(`${API_BASE_URL}/parent-child/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(link),
  });

  if (!response.ok) {
    throw new Error("Failed to create parent-child link");
  }

  return response.json();
}

export async function deleteParentChildLink(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/parent-child/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete parent-child link");
  }
}
