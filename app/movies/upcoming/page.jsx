"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import MovieGrid from "@/components/ui/MovieGrid";
import { Button } from "@/components/ui/button";


const Page = ({ movies }) => {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        const res = await axios.get("/api/tmdb/upcoming");
        if (!alive) return;

        setMovieList(res.data?.results ?? []);
      } catch (error) {
        if (!alive) return;
        setError("internal server error");
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
        {isLoading && <p>Loading...</p>}
        {error && <p>{Error}</p>}

        <aside className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-zinc-900">Upcoming</h3>
          <Button variant="seeMore">
            <Link href={"/pages/upcoming"}>See more →</Link>
          </Button>
        </aside>

        <div className="mt-5">
          <MovieGrid movies={movieList} />
        </div>
      </div>
    </section>
  );
};

export default Page;
