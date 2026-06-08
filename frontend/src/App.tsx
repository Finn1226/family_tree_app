import { useEffect, useState } from "react";

type Person = {
  id: number;
  full_name: string;
  chinese_name?: string | null;
};

type ParentChild = {
  id: number;
  parent_id: number;
  child_id: number;
};

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [parentChildLinks, setParentChildLinks] = useState<ParentChild[]>([]);

  const [fullName, setFullName] = useState("");
  const [chineseName, setChineseName] = useState("");

  const [parentId, setParentId] = useState("");
  const [childId, setChildId] = useState("");

  async function fetchPeople() {
    const res = await fetch("http://127.0.0.1:8000/people/");
    const data = await res.json();
    setPeople(data);
  }

  async function fetchParentChildLinks() {
    const res = await fetch("http://127.0.0.1:8000/parent-child/");
    const data = await res.json();
    setParentChildLinks(data);
  }

  async function createPerson(e: React.FormEvent) {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/people/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        chinese_name: chineseName || null,
      }),
    });

    setFullName("");
    setChineseName("");
    fetchPeople();
  }

  async function createParentChildLink(e: React.FormEvent) {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/parent-child/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent_id: Number(parentId),
        child_id: Number(childId),
      }),
    });

    setParentId("");
    setChildId("");
    fetchParentChildLinks();
  }

  function getPersonName(id: number) {
    const person = people.find((p) => p.id === id);
    return person ? person.full_name : `Person ${id}`;
  }

  useEffect(() => {
    fetchPeople();
    fetchParentChildLinks();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Family Tree App</h1>

      <form onSubmit={createPerson}>
        <h2>Add Person</h2>

        <div>
          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            placeholder="Chinese Name"
            value={chineseName}
            onChange={(e) => setChineseName(e.target.value)}
          />
        </div>

        <button type="submit">Add Person</button>
      </form>

      <form onSubmit={createParentChildLink}>
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

      <h2>People</h2>

      {people.map((person) => (
        <div key={person.id}>
          <strong>{person.full_name}</strong>
          {person.chinese_name && <span> - {person.chinese_name}</span>}
        </div>
      ))}

      <h2>Parent-Child Links</h2>

      {parentChildLinks.map((link) => (
        <div key={link.id}>
          {getPersonName(link.parent_id)} is parent of{" "}
          {getPersonName(link.child_id)}
        </div>
      ))}
    </main>
  );
}

export default App;
