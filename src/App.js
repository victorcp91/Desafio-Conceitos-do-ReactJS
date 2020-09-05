import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((res) => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    api
      .post("repositories", {
        title: new Date(),
        url: "www.teste.com",
        techs: ["React", "Node"],
      })
      .then((res) => {
        setRepositories([...repositories, res.data]);
      });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then((res) => {
      const repositoryIndex = repositories.findIndex(
        (repository) => repository.id === id
      );
      const updatedRepositories = [...repositories];
      updatedRepositories.splice(repositoryIndex, 1);
      setRepositories(updatedRepositories);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
