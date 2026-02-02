"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import SearchDropdown from "./SearchDropDown";



const LS_KEY = "search_term";



export default function Input() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(null);
  const [error, setError] = useState(null);

  const wrapRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY) || "";
      if (saved.trim()) {
        setText(saved);
        setQuery(saved.trim());
      }
    } catch {}
  }, []);

  const debouncedSetQuery = useMemo(
    () =>
      debounce((val) => {
        const trimmed = val.trim();
        setQuery(trimmed);

        try {
          if (trimmed) localStorage.setItem(LS_KEY, trimmed);
        } catch {}
      }, 300),
    [],
  );

  useEffect(() => () => debouncedSetQuery.cancel(), [debouncedSetQuery]);


  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setEmpty(null);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setEmpty(null);
        setError(null);


        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query,
          )}&language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
            signal: controller.signal,
          },
        );

        const results = res?.data?.results ?? [];
        setMovies(results);

        if (results.length === 0) setEmpty("No matching results");
      } catch (e) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
        setError("No Results Found");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [query]);

  const handleChange = (e) => {
    const val = e.target.value;
    setText(val);
    setOpen(true);
    debouncedSetQuery(val);

    // ✅ optional: store raw text too (feels better on refresh)
    try {
      localStorage.setItem(LS_KEY, val);
    } catch {}
  };

  const clearAll = () => {
    setText("");
    setQuery("");
    setMovies([]);
    setEmpty(null);
    setError(null);
    setOpen(false);

    // ✅ clear storage
    try {
      localStorage.removeItem(LS_KEY);
    } catch {}
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-full sm:w-[250px] md:w-[370px] lg:w-[380px]"
    >
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onFocus={() => {
            if (text.trim()) setOpen(true);
          }}
          className="w-full h-[36px] p-2 pr-9 border rounded-lg text-sm"
          placeholder="🔎 type to search"
        />

        {text ? (
          <button
            type="button"
            onClick={clearAll}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-sm"
            aria-label="Clear"
          >
            ✕
          </button>
        ) : null}
      </div>

      {open && (text.trim() || loading) && (
        <SearchDropdown
          movies={movies}
          loading={loading}
          empty={empty}
          error={error}
          onClose={() => setOpen(false)}
          query={query} // ✅ pass trimmed query (better than text)
        />
      )}
    </div>
  );
}
