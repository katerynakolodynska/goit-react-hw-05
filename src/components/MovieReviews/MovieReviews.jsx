import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import s from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    setLoading(true);
    fetchMovieReviews(movieId)
      .then((data) => {
        setReviews(data || []);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setReviews([]);
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className={s.reviewsContainer}>
      <h2 className={s.reviewsHeader}>Reviews</h2>
      {reviews.length === 0 ? (
        <p className={s.noReviews}>We don`t have any reviews for this movie</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className={s.reviewItem}>
              <p className={s.reviewAuthor}>{review.author}:</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieReviews;
