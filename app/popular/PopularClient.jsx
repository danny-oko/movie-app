"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { moviesService } from "@/lib/services/movies";
import { useQueryState, parseAsInteger } from "nuqs";

import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { Button } from "@/components/ui/button";
import MovieGrid from "@/components/ui/MovieGrid";
import Pager from "@/components/ui/Pager";

export default function PopularClient() {
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    window.scrollTo({ top: 0, behavior: "smooth" });

    setLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await moviesService.popular(page);
        if (!alive) return;

        setMovies(data?.results || []);
        setTotalPages(data?.total_pages || 1);
      } catch (e) {
        const isCanceled =
          axios.isCancel?.(e) ||
          e?.name === "CanceledError" ||
          e?.code === "ERR_CANCELED";

        if (!isCanceled && alive) setError(e?.message || "Failed to load");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [page]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-[80vw] max-w-none px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
          {error && <p className="text-destructive">{error}</p>}

          <aside className="flex flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
              Popular
            </h3>

            <Button
              asChild
              variant="seeMore"
              className="w-fit touch-manipulation"
            >
              <Link href="/">← Return to home page</Link>
            </Button>
          </aside>

          <div className="mt-4 sm:mt-5">
            <MovieGrid movies={movies} isLoading={loading} />
          </div>
        </div>

        <Pager
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          maxButtons={3}
          disabled={loading}
        />
      </main>

      <Footer />
    </div>
  );
}
