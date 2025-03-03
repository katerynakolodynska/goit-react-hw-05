import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const getCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    getCast();
  }, [movieId]);

  return (
    <ul className={s.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={s.castItem}>
          <img
            className={s.castImage}
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                : "https://dummyimage.com/150x200/cdcdcd/000.jpg&text=No+photo"
            }
            alt={actor.name}
          />
          <h3>{actor.name}</h3>
          <p>{actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
