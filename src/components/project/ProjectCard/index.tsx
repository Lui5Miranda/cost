import { Link } from "react-router-dom";

import styles from "./styles.module.css"
import { BsFillTrashFill, BsPencil } from "react-icons/bs";

type ProjectCardProps = {
  id: string;
  name: string
  budget: number;
  category: string;
  handleRemove: (id: string) => void;
}

export function ProjectCard({id, name, budget, category, handleRemove}: ProjectCardProps) {

  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleRemove(id)
  }

  return (
    <div className={styles.projectCard} id={id}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>
      <p className={styles.categoryText}> 
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.projectCardActions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

