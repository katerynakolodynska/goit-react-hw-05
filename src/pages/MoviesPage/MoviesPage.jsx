import { useState, useEffect } from "react";
import { searchMovies } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query === "") return;

    const fetchMovies = async () => {
      try {
        const data = await searchMovies(query);
        setMovies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} />
      <MovieList movies={movies} />
    </>
  );
}

export default MoviesPage;
