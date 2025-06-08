import { useEffect, useState } from "react";
import { Input } from "../../form/Input";
import { Select } from "../../form/Select";
import { SubmitButton } from "../../form/SubmitButton";
import styles from "./styles.module.css";

type ProjectFormProps = {
  buttonText: string;
  handleSubmit(project: Project): void;
  projectData?: Project;
};

type Project = {
  name?: string;
  budget?: number;
  category?: {
    id: number;
    name: string;
  };
  cost?: number;
  services?: unknown[];
};

export function ProjectForm({
  buttonText,
  handleSubmit,
  projectData = {}
}: ProjectFormProps) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [project, setProject] = useState<Project>({
    name: "",
    budget: 0,
    category: { id: 0, name: "" },
    cost: 0,
    services: [],
    ...projectData,
  });

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => resp.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedId = Number(e.target.value);
    const selectedName = e.target.options[e.target.selectedIndex].text;
    setProject({
      ...project,
      category: {
        id: selectedId,
        name: selectedName,
      },
    });
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(project);
  };

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        text="Nome do Projeto"
        type="text"
        name="name"
        placeholder="Nome do Projeto"
        handleOnChange={handleChange}
      />

      <Input
        text="Orçamento do Projeto"
        type="number"
        name="budget"
        placeholder="Orçamento do Projeto"
        handleOnChange={handleChange}
      />

      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id: ""}
      />

      <SubmitButton text={buttonText} />
    </form>
  );
}

