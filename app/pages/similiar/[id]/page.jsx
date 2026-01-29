"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import MovieGrid from "../../../../components/ui/MovieGrid";
import Pager from "../../../../components/ui/Pager";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

export default function Page() {
  const { id } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get(
          `/api/tmdb/movies/${id}/similiar?page=${page}`,
          { signal: controller.signal },
        );

        setMovies(data?.results ?? []);
        setTotalPages(data?.total_pages ?? 1);
      } catch (e) {
        if (e.code === "ERR_CANCELED" || e.name === "CanceledError") return;
        setError(e?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, [id, page]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Similiar</h1>

            <Link
              href="/"
              className="text-sm text-foreground hover:text-foreground/90 cursor-pointer"
            >
              Return to home page
            </Link>
          </div>

          <div className="mt-5">
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
