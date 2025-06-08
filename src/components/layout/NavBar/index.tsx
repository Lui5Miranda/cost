import { Link } from "react-router-dom";

import { Container } from "../Container";

import style from "./styles.module.css";
import logo from "../../../img/costs_logo.png";

export function NavBar() {
  return (
    <nav className={style.navBar}>
      <Container>
        {/* <Link to="/">
          <img src={logo} alt="Costs" />
        </Link> */}
        <Link to="/">
          <img src={logo} alt="Costs" />
        </Link>
        <ul className={style.list}>
          <li className={style.item}></li>
          <li className={style.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={style.item}>
            <Link to="/projects">Projetos</Link>
          </li>
          <li className={style.item}>
            <Link to="/company">Empresa</Link>
          </li>
          <li className={style.item}>
            <Link to="/contact">Contato</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}
