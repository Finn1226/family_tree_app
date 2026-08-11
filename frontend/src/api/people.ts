import type { Person, CreatePersonInput } from "../types/family";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getPeople(): Promise<Person[]> {
  const response = await fetch(`${API_BASE_URL}/people/`);

  if (!response.ok) {
    throw new Error("Failed to fetch people");
  }

  return response.json();
}

export async function getPerson(id: number): Promise<Person> {
  const response = await fetch(`${API_BASE_URL}/people/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch person");
  }

  return response.json();
}

export async function createPerson(person: CreatePersonInput): Promise<Person> {
  const response = await fetch(`${API_BASE_URL}/people/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  if (!response.ok) {
    throw new Error("Failed to create person");
  }

  return response.json();
}

export async function updatePerson(
  id: number,
  person: CreatePersonInput,
): Promise<Person> {
  const response = await fetch(`${API_BASE_URL}/people/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  if (!response.ok) {
    throw new Error("Failed to update person");
  }

  return response.json();
}

export async function deletePerson(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/people/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete person");
  }
}
