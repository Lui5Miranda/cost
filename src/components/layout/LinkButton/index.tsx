import { Link } from "react-router-dom";
import styles from "./styles.module.css";

type LinkButtonProps = {
  to: string;
  text: string;
};

export function LinkButton({ to, text }: LinkButtonProps) {
  return (
    <Link className={styles.button} to={to}>
      {text}
    </Link>
  );
}
