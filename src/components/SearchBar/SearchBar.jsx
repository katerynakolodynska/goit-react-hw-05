import { useState } from "react";
import s from "./SearchBar.module.css";

function SearchBar({ handleSubmit }) {
  const [query, setQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(query);
  };

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <input
        className={s.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies"
      />
      <button type="submit" className={s.btn}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
