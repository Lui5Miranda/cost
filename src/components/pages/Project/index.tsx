import { v4 as uuidv4 } from "uuid";

import { Loading } from "../../layout/Loading";
import { Container } from "../../layout/Container";
import { ProjectForm } from "../../project/ProjectForm";
import { Message } from "../../layout/Message";
import { ServiceForm } from "../../service/ServiceForm";
import { ServiceCard } from "../../service/ServiceCard";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./styles.module.css";

type ServiceType = {
  id: string;
  name: string;
  cost: number;
  description: string;
};

type DataType = {
  id: string;
  name: string;
  budget: number;
  category: {
    id: number;
    name: string;
  };
  cost: number;
  services: ServiceType[];
  description: string;
};

export function Project() {
  const { id } = useParams();
  const [project, setProject] = useState<DataType>();
  const [services, setServices] = useState<ServiceType[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<string>();

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(data);
        setServices(data.services);
      })
      .catch(error => console.log(error));
  }, [id]);

  function editPost(project: DataType) {
    setMessage("");
    setType("");

    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Projeto atualizado!");
        setType("success");
      })
      .catch(error => console.log(error));
  }

  function createService() {
    setMessage("");
    setType("");

    const lastService = project?.services[project.services.length - 1];

    if (!lastService) {
      setMessage("Nenhum serviço para adicionar.");
      setType("error");
      return false;
    }

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    if (lastServiceCost === undefined) {
      setMessage("O custo do serviço não foi definido.");
      setType("error");
      project?.services.pop();
      return false;
    }

    const newCost = Number(project.cost) + Number(lastServiceCost);

    //max value

    if (newCost > Number(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço");
      setType("error");
      project?.services.pop();
      return false;
    }

    //add service

    project.cost = newCost;

    //update project

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify(project),
    })
      .then(resp => resp.json)
      .then(() => {
        setShowServiceForm(false);
      })
      .catch(error => console.log(error));
  }

  function removeService() {}

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project && project.name ? (
        <div className={styles.projectDetails}>
          <Container customClass="column">
            {type && message && <Message type={type} msg={message} />}
            <div className={styles.detailsContainer}>
              <h1>{project.name}</h1>
              <button className={styles.buttons} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.projectInfo}>
                  <p>
                    <span>
                      Categoria: <strong>{project.category.name}</strong>
                    </span>
                  </p>
                  <p>
                    <span>
                      Total de Orçamento: <strong>R${project.budget}</strong>
                    </span>
                  </p>
                  <p>
                    <span>
                      Total Utilizado: <strong>R${project.cost}</strong>
                    </span>
                  </p>
                </div>
              ) : (
                <div className={styles.projectInfo}>
                  <ProjectForm
                    handleSubmit={editPost}
                    buttonText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.detailsContainer}>
              <h2>Adicionar Serviço</h2>
              <button className={styles.buttons} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button>
              <div className={styles.projectInfo}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    buttonText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Servicos</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map(service => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length == 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
