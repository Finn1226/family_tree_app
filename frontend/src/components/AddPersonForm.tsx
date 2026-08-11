import { useState } from "react";
import { createPerson } from "../api/people";

type AddPersonFormProps = {
  onPersonCreated: () => Promise<void>;
};

export default function AddPersonForm({ onPersonCreated }: AddPersonFormProps) {
  const [fullName, setFullName] = useState("");
  const [chineseName, setChineseName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createPerson({
      full_name: fullName,
      chinese_name: chineseName || null,
    });

    setFullName("");
    setChineseName("");

    await onPersonCreated();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Person</h2>

      <input
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <input
        placeholder="Chinese name"
        value={chineseName}
        onChange={(e) => setChineseName(e.target.value)}
      />

      <button type="submit">Add Person</button>
    </form>
  );
}
