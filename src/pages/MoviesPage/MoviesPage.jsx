import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies } from "../../services/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();
  const location = useLocation();

  const query = params.get("query") ?? "";

  useEffect(() => {
    if (!query) return;
    searchMovies(query).then(setMovies);
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    setParams({ query: e.target.elements.query.value });
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="query" className={styles.input} />
        <button className={styles.button}>Search</button>
      </form>

      <MovieList
        movies={movies}
        from={location}
      />
    </main>
  );
}
