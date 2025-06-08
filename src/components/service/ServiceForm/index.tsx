import { useState } from "react";

import { Input } from "../../form/Input";
import { SubmitButton } from "../../form/SubmitButton";

import styles from "../../project/ProjectForm/styles.module.css";

type ServiceType = {
  id?: string;
  name?: string;
  cost?: number;
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

interface PropsServiceForm {
  handleSubmit: (service: DataType) => void;
  buttonText: string;
  projectData: DataType;
}

export function ServiceForm({
  handleSubmit,
  buttonText,
  projectData,
}: PropsServiceForm) {
  const [service, setService] = useState({});

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    projectData.services.push(service as never);
    handleSubmit(projectData);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        text="Nome do serviço"
        type="text"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />
      <Input
        text="Custo do serviço"
        type="number"
        name="cost"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />
      <Input
        text="Descrição do serviço"
        type="text"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      />
      <SubmitButton text={buttonText} />
    </form>
  );
}
