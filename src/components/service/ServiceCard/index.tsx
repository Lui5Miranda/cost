import { BsFillTrashFill } from "react-icons/bs";

import styles from "../../project/ProjectCard/styles.module.css";

interface ServiceCardProps {
  id: string;
  name: string;
  cost: number;
  description: string;
  handleRemove: (id: string) => void;
}


export function ServiceCard({id, name, cost, description, handleRemove}: ServiceCardProps) {

  const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleRemove(id)
  }

  return(
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p>
        <span>Custo total:</span> R${cost}
      </p>
      <p>{description}</p>
      <div className={styles.projectCardActions}>
        <button onClick={remove}>
          <BsFillTrashFill /> 
          Excluir
        </button>
      </div>
    </div>
  )
}