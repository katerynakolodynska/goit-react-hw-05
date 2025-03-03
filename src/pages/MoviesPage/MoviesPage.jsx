import { useState } from "react";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={s.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </>
  );
};

export default MoviesPage;
