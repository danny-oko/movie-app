"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import MovieGrid from "@/components/ui/MovieGrid";
import { Button } from "@/components/ui/button";

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

        const res = await axios.get("/api/tmdb/popular");

        if (!alive) return;

        // console.log("TMDB response:", res.data);
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
    <div className="upcoming flex flex-col gap-8 pl-24 pr-26">
      {isLoading && <p>Loading...</p>}
      {error && <p>{Error}</p>}
      <aside className="titles w-full h-12 flex items-center justify-between">
        <h3 className="font-semibold text-2xl">Popular</h3>
        <Button variant="seeMore">
          <Link href={"/pages/popular"}>See more →</Link>
        </Button>
      </aside>
      <MovieGrid movies={movieList} />
    </div>
  );
};

export default Page;
