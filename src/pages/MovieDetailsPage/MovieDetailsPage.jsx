import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../services/tmdbApi";
import styles from "./MovieDetailsPage.module.css";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();

  const backLink = location.state?.from ?? "/";

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError("Failed to load movie details");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  const {
    original_title,
    poster_path,
    overview,
    genres,
    vote_average,
  } = movie;

  return (
    <main className={styles.container}>
      <Link to={backLink} className={styles.back}>
        ← Go back
      </Link>

      <div className={styles.details}>
        {poster_path && (
          <img
            src={`${IMG_BASE_URL}${poster_path}`}
            alt={original_title}
            className={styles.poster}
          />
        )}

        <div className={styles.info}>
          <h2>{original_title}</h2>

          <p>
            <strong>User score:</strong> {Math.round(vote_average * 10)}%
          </p>

          <h3>Overview</h3>
          <p>{overview || "No overview available."}</p>

          <h3>Genres</h3>
          <p>
            {genres?.length
              ? genres.map(g => g.name).join(", ")
              : "No genres information"}
          </p>
        </div>
      </div>

      <hr />

      <nav className={styles.subnav}>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>

      <Outlet />
    </main>
  );
}
