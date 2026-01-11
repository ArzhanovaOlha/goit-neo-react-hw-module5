import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.link}>
          Home
        </NavLink>
        <NavLink to="/movies" className={styles.link}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
}
