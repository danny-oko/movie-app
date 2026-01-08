"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("/api/tmdb/popular");
        if (!alive) return;

        setMovies(res.data?.results ?? []);
      } catch (e) {
        if (!alive) return;
        setError("Failed to load popular movies.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Popular</h1>

      {loading && <p className="mt-3 opacity-70">Loading…</p>}
      {error && <p className="mt-3 text-red-400">{error}</p>}

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {!loading &&
          !error &&
          movies.slice(0, 12).map((m) => (
            <div key={m.id} className="rounded-xl overflow-hidden bg-white/5">
              <img
                className="w-full aspect-[2/3] object-cover"
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                    : "https://picsum.photos/400/600"
                }
                alt={m.title}
              />
              <div className="p-3">
                <p className="text-sm opacity-70">
                  {Number(m.vote_average).toFixed(1)} / 10
                </p>
                <p className="font-semibold line-clamp-2">{m.title}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
