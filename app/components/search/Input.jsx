"use client";
import React, { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Input() {
  const { searchValue } = useSearchParams();

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const onChange = useMemo(
    () => debounce((e) => setQuery(e.target.value), 300),
    [],
  );

  useEffect(() => () => onChange.cancel(), [onChange]);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const controller = new AbortController();

    axios
      .get(`/api/tmdb/${encodeURIComponent(query)}/search-movie`, {
        params: { page: 1 },
        signal: controller.signal,
      })
      .then((res) => console.log(res.data.results.original_title))
      .then((res) => setMovies(res?.data?.results ?? []))
      .catch(() => {});

    return () => controller.abort();
  }, [query]);

  return (
    <div>
      <input placeholder="Search movie..." onChange={onChange} />
      {movies.map((m) => (
        <p key={m.id}>{m.title || m.original_title}</p>
      ))}
    </div>
  );
}
