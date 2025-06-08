import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.socialList}>
        <li><FaFacebook /></li>
        <li><FaInstagram /></li>
        <li><FaLinkedin /></li>
      </ul>
      <p className={styles.copyright}><span>Costs</span> &copy; {new Date().getFullYear()} - Todos os direitos reservados </p>
    </footer>
  );
}
