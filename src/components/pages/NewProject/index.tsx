import { ProjectForm } from "../../project/ProjectForm";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

export function NewProject() {
  
  const navigate = useNavigate();

  function createPost(project: { cost: number; services: never[]; }) {
    //initialize cost and services
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigate("/projects", { state: { message: `${data.name} criado com sucesso` } });
      })
      .catch((err) => console.log(err));
    
  }
  
  return(


    <div className={styles.newProjectContainer}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} buttonText="Criar Projeto" />
    </div>
  )
}