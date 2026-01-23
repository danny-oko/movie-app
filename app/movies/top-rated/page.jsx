"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import MovieGridForMore from "@/components/ui/MovieGridComponentForMorePages";
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
    <div className="upcoming flex flex-col gap-8 p-26">
      {isLoading && <p>Loading...</p>}
      {error && <p>{Error}</p>}
      <aside className="titles w-full h-12 flex items-center justify-between">
        <h3 className="font-semibold text-2xl">Top Rated</h3>
        <Button variant="seeMore">
          <Link href={"/pages/top-rated"}>See more →</Link>
        </Button>
      </aside>
      <MovieGridForMore movies={movieList} />
    </div>
  );
};

export default Page;
