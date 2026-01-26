"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import MovieGrid from "@/components/ui/MovieGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const res = await axios.get("/api/tmdb/top-rated");

        if (!alive) return;

        setMovieList(res.data?.results ?? []);
      } catch (e) {
        if (!alive) return;
        console.error(e);
        setError("Failed to fetch data from TMDB");
        setMovieList([]);
      } finally {
        if (!alive) return;
        setIsLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {error && <p>{Error}</p>}

        <aside className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-zinc-900">Top Rated</h3>
          <Button variant="seeMore">
            <Link href={"/pages/top-rated"}>See more →</Link>
          </Button>
        </aside>

        <div className="mt-5">
          <MovieGrid movies={movieList} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
};

export default Page;
