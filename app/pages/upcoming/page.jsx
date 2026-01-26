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
  const [Loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get(`/api/tmdb/upcoming?page=${page}`, {
          signal: controller.signal,
        });

        setMovies(data?.results ?? []);
        setTotalPages(data?.total_pages ?? []);
      } catch (e) {
        if (
          axios.isCancel?.(e) ||
          e.name === "CanceledError" ||
          e.code === "ERR_CANCELED"
        ) {
          setError(e?.message || "Failed to Load!");
        }
        setError("Error:", e);
      } finally {
        setLoading(false);
      }
    };
    run();
    return () => {
      controller.abort();
    };
  }, [page]);

  const maxButtons = 3;

  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + maxButtons - 1);

  // keep window size when near the end
  start = Math.max(1, end - maxButtons + 1);

  const pagesToShow = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  );

  const showLeftEllipsis = start > 2;
  const showRightEllipsis = end < totalPages - 1;


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
          {Loading && <p>Loading...</p>}
          {error && <p>{Error}</p>}

          <aside className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-zinc-900">Upcoming</h3>
            <Button variant="seeMore">
              <Link href={"/"}>← Back to Menu</Link>
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
