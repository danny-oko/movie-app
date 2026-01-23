"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import MovieGrid from "../../../components/ui/MovieGrid";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const res = await axios.get("/api/tmdb/upcoming");

        if (!alive) return;

        setMovieList(res.data?.results ?? []);
      } catch (e) {
        if (!alive) return;
        console.error(e);
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
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
          {isLoading && <p>Loading...</p>}
          {error && <p>{Error}</p>}

          <aside className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-zinc-900">Upcoming</h3>
            <Button variant="seeMore">
              <Link href={"/"}>← Back to Menu</Link>
            </Button>
          </aside>

          <div className="mt-5">
            <MovieGrid movies={movieList} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
