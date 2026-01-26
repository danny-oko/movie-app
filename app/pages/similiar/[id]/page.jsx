"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import MovieGrid from "../../../../components/ui/MovieGrid";
import Pager from "../../../../components/ui/Pager";

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
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-zinc-900">Similiar</h1>

            <Link
              href="/"
              className="text-sm text-zinc-700 text-md cursor-pointer"
            >
              Return to home page
            </Link>
          </div>

          <div className="mt-5">
            <MovieGrid movies={movies} isLoading={loading} />

            {error && <p className="mt-4 text-red-600">{error}</p>}
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
