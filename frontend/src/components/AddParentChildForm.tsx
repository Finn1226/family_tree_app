import { useState } from "react";

import { createParentChildLink } from "../api/parentChild";

import type { Person } from "../types/family";

type AddParentChildFormProps = {
  people: Person[];
  onRelationshipCreated: () => Promise<void>;
};

export default function AddParentChildForm({
  people,
  onRelationshipCreated,
}: AddParentChildFormProps) {
  const [parentId, setParentId] = useState("");
  const [childId, setChildId] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createParentChildLink({
      parent_id: Number(parentId),
      child_id: Number(childId),
    });

    setParentId("");
    setChildId("");

    await onRelationshipCreated();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Parent-Child Relationship</h2>

      <select
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
        required
      >
        <option value="">Select parent</option>

        {people.map((person) => (
          <option key={person.id} value={person.id}>
            {person.full_name}
          </option>
        ))}
      </select>

      <span> is parent of </span>

      <select
        value={childId}
        onChange={(e) => setChildId(e.target.value)}
        required
      >
        <option value="">Select child</option>

        {people.map((person) => (
          <option key={person.id} value={person.id}>
            {person.full_name}
          </option>
        ))}
      </select>

      <button type="submit">Add Link</button>
    </form>
  );
}
