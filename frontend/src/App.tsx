import { useEffect, useState } from "react";

type Person = {
  id: number;
  full_name: string;
  chinese_name?: string | null;
};

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [fullName, setFullName] = useState("");
  const [chineseName, setChineseName] = useState("");

  async function fetchPeople() {
    const res = await fetch("http://127.0.0.1:8000/people/");
    const data = await res.json();
    setPeople(data);
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

  useEffect(() => {
    fetchPeople();
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

      <h2>People</h2>

      {people.map((person) => (
        <div key={person.id}>
          <strong>{person.full_name}</strong>
          {person.chinese_name && <span> - {person.chinese_name}</span>}
        </div>
      ))}
    </main>
  );
}

export default App;
