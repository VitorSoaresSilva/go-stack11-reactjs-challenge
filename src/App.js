import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response =>{
      if(response.status === 200){
        setRepositories(response.data);
      }
    })
  },[]);

  async function handleAddRepository() {
    api.post('/repositories',{url:"url",title:"title",techs:["1"]}).then(response =>{
      const repo = response.data;
      setRepositories([...repositories,repo])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response =>{
      if(response.status === 204){
        setRepositories(repositories.filter(repo=> repo.id !== id))
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repo =>{ 
          return(
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
