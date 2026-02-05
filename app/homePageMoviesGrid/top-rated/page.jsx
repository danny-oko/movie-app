"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import MovieGrid from "@/components/ui/MovieGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { moviesService } from "@/lib/services/movies";

const Page = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        setError(null);
        setIsLoading(true);

        moviesService.topRated(page).then((data) => {
          setMovieList(data?.results ?? []);
        });

        if (!alive) return;
      } catch (e) {
        if (!alive) return;
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
  }, [page]);

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {error && <p className="text-destructive">{error}</p>}

        <aside className="flex flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
            Top Rated
          </h3>
          <Button variant="seeMore" className="w-fit touch-manipulation">
            <Link href={"/top-rated"}>See more →</Link>
          </Button>
        </aside>

        <div className="mt-4 sm:mt-5">
          <MovieGrid movies={movieList} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
};

export default Page;
