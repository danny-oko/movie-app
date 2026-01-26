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
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          <aside className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-zinc-900">Top Rated</h3>
            <Button variant="seeMore">
              <Link href={"/"}>← Return to home page</Link>
            </Button>
          </aside>

          <div className="mt-5">
            <MovieGrid movies={movies} />
          </div>
        </div>

        <Pager
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          maxButtons={3}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Page;
