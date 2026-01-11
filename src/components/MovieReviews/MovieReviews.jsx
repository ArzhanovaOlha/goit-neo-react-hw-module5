import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/tmdbApi";
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  if (!reviews.length) return <p>No reviews</p>;

  return (
    <ul className={styles.list}>
      {reviews.map(review => (
        <li key={review.id} className={styles.review}>
          <strong className={styles.author}>{review.author}</strong>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
