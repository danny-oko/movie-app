"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const Input = () => {
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState(""); // instant typing
  const [query, setQuery] = useState(""); // debounced value
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
      }, 300),
    [],
  );

  useEffect(() => () => debouncedSetQuery.cancel(), [debouncedSetQuery]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setMovies([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("/api/tmdb/search", {
          params: { query: trimmed, page },
          signal: controller.signal,
        });

        setMovies(res?.data?.results ?? []);
      } catch (e: any) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
        setError(e?.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [query, page]);

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          const v = e.target.value;
          setInputValue(v); // instant update
          setPage(1); // reset page
          debouncedSetQuery(v); // debounced search
        }}
        className="w-[260px] p-2 border rounded-lg"
        placeholder="Search movie..."
      />

      {loading && <p className="text-sm opacity-70">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-2">
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
        >
          Prev
        </button>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
        >
          Next
        </button>
        <span className="text-sm opacity-70 self-center">Page {page}</span>
      </div>

      <ul className="space-y-1">
        {movies.map((m) => (
          <li key={m.id} className="text-sm">
            {m.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Input;
