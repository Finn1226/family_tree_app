import { useEffect, useState } from "react";

import AddPersonForm from "./components/AddPersonForm";
import AddParentChildForm from "./components/AddParentChildForm";
import FamilyGraph from "./components/FamilyGraph";

import { getPeople } from "./api/people";
import { getParentChildLinks } from "./api/parentChild";

import type { Person, ParentChild } from "./types/family";

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [parentChildLinks, setParentChildLinks] = useState<ParentChild[]>([]);

  async function refreshPeople() {
    const data = await getPeople();
    setPeople(data);
  }

  async function refreshParentChildLinks() {
    const data = await getParentChildLinks();
    setParentChildLinks(data);
  }

  useEffect(() => {
    refreshPeople();
    refreshParentChildLinks();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Family Tree App</h1>

      <AddPersonForm onPersonCreated={refreshPeople} />

      <AddParentChildForm
        people={people}
        onRelationshipCreated={refreshParentChildLinks}
      />

      <h2>Family Graph</h2>

      <FamilyGraph people={people} relationships={parentChildLinks} />
    </main>
  );
}

export default App;
