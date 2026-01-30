"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const Input = () => {
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);

  const handleDebounceChange = useMemo(
    () => debounce((value) => setInputValue(value), 300),
    [],
  );

  useEffect(() => () => handleDebounceChange.cancel(), [handleDebounceChange]);

  useEffect(() => {
    const query = inputValue.trim();
    if (!query) {
      setMovies([]);
      return;
    }

    const getMovies = async () => {
      try {
        const res = await axios.get(
          `/api/tmdb/${encodeURIComponent(query)}/search`,
          { params: { page } },
        );
        setMovies(res?.data?.results ?? []);
      } catch (e) {
        setError(e.message);
      }
    };

    getMovies();
  }, [inputValue, page]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleDebounceChange(e.target.value)}
        className="w-[260px] p-2 border rounded-lg"
      />
    </div>
  );
};

export default Input;
