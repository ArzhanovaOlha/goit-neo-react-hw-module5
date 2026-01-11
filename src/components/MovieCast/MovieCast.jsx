import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/tmdbApi";
import styles from "./MovieCast.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

export default function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch {
        setError("Failed to load cast information");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  if (isLoading) {
    return <p className={styles.info}>Loading cast...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (cast.length === 0) {
    return <p className={styles.info}>No cast information available.</p>;
  }

  return (
    <ul className={styles.list}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={styles.item}>
          <img
            src={
              profile_path
                ? `${IMAGE_BASE_URL}${profile_path}`
                : null
            }
            alt={name}
            className={styles.image}
          />
          <p className={styles.name}>{name}</p>
          <p className={styles.character}>as {character}</p>
        </li>
      ))}
    </ul>
  );
}
