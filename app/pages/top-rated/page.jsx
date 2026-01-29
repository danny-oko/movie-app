"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

import { Button } from "@/components/ui/button";
import MovieGrid from "../../../components/ui/MovieGrid";

import Pager from "../../../components/ui/Pager";

const Page = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      try {
        const { data } = await axios.get(`/api/tmdb/top-rated?page=${page}`, {
          signal: controller.signal,
        });
        setMovies(data?.results);
        setTotalPage(data.total_pages);
      } catch (e) {
        if (
          axios.isCancel?.(e) ||
          e.name === "CanceledError" ||
          e.code === "ERR_CANCELED"
        ) {
          setError(e?.message || "Failed to load");
        }
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
          {loading && <p className="text-foreground">Loading...</p>}
          {error && <p className="text-destructive">{error}</p>}

          <aside className="flex flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
              Top Rated
            </h3>
            <Button variant="seeMore" className="w-fit touch-manipulation">
              <Link href={"/"}>← Return to home page</Link>
            </Button>
          </aside>

          <div className="mt-4 sm:mt-5">
            <MovieGrid movies={movies} isLoading={loading} />
          </div>
        </div>

        <Pager
          page={page}
          totalPages={totalPage}
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
