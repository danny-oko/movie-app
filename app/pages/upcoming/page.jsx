"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MovieGrid from "../../../components/ui/MovieGrid";
import { Button } from "@/components/ui/button";

import Pager from "../../../components/ui/Pager";

const Page = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    window.scrollTo({ top: 0, behavior: "smooth" });
      
    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get(`/api/tmdb/upcoming?page=${page}`, {
          signal: controller.signal,
        });

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
    return () => {
      controller.abort();
    };
  }, [page]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
          {error && <p>{error}</p>}

          <aside className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-zinc-900">Upcoming</h3>
            <Button variant="seeMore">
              <Link href={"/"}>← Return to home page</Link>
            </Button>
          </aside>

          <div className="mt-5">
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
};

export default Page;
