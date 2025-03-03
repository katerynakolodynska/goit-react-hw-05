import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchMovieDetails } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  const duration = movie.runtime ? `${movie.runtime} min` : "N/A";
  const averageRating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  const { title, overview, genres } = movie;

  return (
    <div className={s.container}>
      <Link to={backLink.current} className={s.backLink}>
        Go Back to Movies
      </Link>
      <div className={s.detailsWrapper}>
        <div className={s.imageWrapper}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImg
            }
            width={250}
            alt="poster"
          />
          <nav className={s.link}>
            <h3>Additional information</h3>
            <Link to="cast" className={s.navLink}>
              Cast
            </Link>
            <Link to="reviews" className={s.navLink}>
              Reviews
            </Link>
          </nav>
        </div>

        <div className={s.infoWrapper}>
          <h1 className={s.title}>{title}</h1>
          <p className={s.overview}>{overview}</p>

          <div className={s.stats}>
            <p>
              <strong>Duration:</strong> {duration}
            </p>
            <p>
              <strong>Average Rating:</strong> {averageRating} / 10
            </p>
            <ul className={s.genresList}>
              <li className={s.genresItem}>
                <strong>Genres:</strong>
              </li>
              {genres && genres.length > 0 ? (
                genres.map(({ id, name }) => <li key={id}>{name}</li>)
              ) : (
                <li className={s.genres_item}>N/A</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
