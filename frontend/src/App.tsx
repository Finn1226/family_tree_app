import { useEffect, useState } from "react";

type Person = {
  id: number;
  full_name: string;
  chinese_name?: string | null;
};

function App() {
  const [people, setPeople] = useState<Person[]>([]);

  async function fetchPeople() {
    const res = await fetch("http://127.0.0.1:8000/people/");
    const data = await res.json();
    setPeople(data);
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Family Tree App</h1>

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
