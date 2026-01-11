import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTrendingMovies } from "../../services/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrendingMovies().then(setMovies);
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Trending today</h1>

      <MovieList
        movies={movies}
        from={location}
      />
    </main>
  );
}
