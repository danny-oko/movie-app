"use client";
import axios from "axios";
import debounce from "lodash.debounce";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
    <div className="relative">
      <input
        placeholder="Search movie..."
        onChange={onChange}
        className="h-9 w-[260px] sm:w-[340px] md:w-[380px] rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
      />
      {movies.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-[280px] w-full overflow-auto rounded-lg border border-border bg-popover py-2 shadow-lg">
          {movies.map((m) => (
            <p
              key={m.id}
              className="px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {m.title || m.original_title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
