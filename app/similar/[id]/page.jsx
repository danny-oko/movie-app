"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import MovieGrid from "@/components/ui/MovieGrid";
import Pager from "@/components/ui/Pager";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

import { moviesService } from "@/lib/services/movies";
import { useQueryState, parseAsInteger } from "nuqs";

export default function Page() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params?.id;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await moviesService.similar(id, page);
        setMovies(data?.results ?? []);
        setTotalPages(data?.total_pages ?? 1);
      } catch (e) {
        if (e.code === "ERR_CANCELED" || e.name === "CanceledError") return;
        setError(e?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id, page]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
          <div className="flex flex-row items-center justify-between gap-4">
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              Similar
            </h1>

            <Link href={"/"} className="text-sm">
              ← Return to home page
            </Link>
          </div>

          <div className="mt-4 sm:mt-5">
            <MovieGrid movies={movies} isLoading={loading} />

            {error && <p className="mt-4 text-destructive">{error}</p>}
          </div>
        </div>

        <div className="pb-10">
          <Pager
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            maxButtons={3}
            disabled={loading}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
