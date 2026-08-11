import { useEffect, useState } from "react";
import FamilyGraph from "./components/FamilyGraph";

import { getPeople, createPerson, type Person } from "./api/people";

import {
  getParentChildLinks,
  createParentChildLink,
  type ParentChild,
} from "./api/parentChild";

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [parentChildLinks, setParentChildLinks] = useState<ParentChild[]>([]);

  const [fullName, setFullName] = useState("");
  const [chineseName, setChineseName] = useState("");

  const [parentId, setParentId] = useState("");
  const [childId, setChildId] = useState("");

  async function refreshPeople() {
    const data = await getPeople();
    setPeople(data);
  }

  async function refreshParentChildLinks() {
    const data = await getParentChildLinks();
    setParentChildLinks(data);
  }

  async function handleCreatePerson(e: React.FormEvent) {
    e.preventDefault();

    await createPerson({
      full_name: fullName,
      chinese_name: chineseName || null,
    });

    setFullName("");
    setChineseName("");

    await refreshPeople();
  }

  async function handleCreateParentChildLink(e: React.FormEvent) {
    e.preventDefault();

    await createParentChildLink({
      parent_id: Number(parentId),
      child_id: Number(childId),
    });

    setParentId("");
    setChildId("");

    await refreshParentChildLinks();
  }

  useEffect(() => {
    refreshPeople();
    refreshParentChildLinks();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Family Tree App</h1>

      <form onSubmit={handleCreatePerson}>
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

      <form onSubmit={handleCreateParentChildLink}>
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

      <h2>Family Graph</h2>

      <FamilyGraph people={people} relationships={parentChildLinks} />
    </main>
  );
}

export default App;
