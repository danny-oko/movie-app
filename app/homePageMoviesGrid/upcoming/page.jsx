"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import MovieGrid from "@/components/ui/MovieGrid";
import { Button } from "@/components/ui/button";

import { moviesService } from "@/lib/services/movies";

const Page = ({ movies }) => {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        moviesService.upcoming(page).then((data) => {
          setMovieList(data?.results ?? []);
        });

        if (!alive) return;
      } catch (error) {
        if (!alive) return;
        setError("internal server error");
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
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {error && <p className="text-destructive">{error}</p>}

        <aside className="flex flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
            Upcoming
          </h3>
          <Button variant="seeMore" className="w-fit touch-manipulation">
            <Link href={"/upcoming"}>See more →</Link>
          </Button>
        </aside>

        <div className="mt-4 sm:mt-5">
          <MovieGrid movies={movieList} isLoading={loading} />
        </div>
      </div>
    </section>
  );
};

export default Page;
