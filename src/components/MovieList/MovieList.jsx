import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";
const PLACEHOLDER =
  "https://via.placeholder.com/300x450?text=No+Image";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.card}>
          <Link
            to={`/movies/${id}`}
            state={{ from: location }}
            className={styles.link}
          >
            <img
              src={poster_path ? `${IMAGE_BASE_URL}${poster_path}` : null}
              alt={title}
            />

            <h3 className={styles.title}>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
