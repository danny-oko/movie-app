"use client";
import React, { useState, useEffect } from "react";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import MovieGrid from "../../../../components/ui/MovieGrid";
import Pager from "../../../../components/ui/Pager";
import GenreChips from "../../../../components/ui/GenreChips";

import Link from "next/link";

import axios from "axios";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [genresCount, setGenresCount] = useState();
  const [genreError, setGenreError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(null);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(true);

  // console.log(loadingGenres, loadingMovies);

  useEffect(() => {
    const controller = new AbortController();

    const getGenres = async () => {
      try {
        const res = await axios.get("/api/tmdb/genres", {
          signal: controller.signal,
        });
        setGenresCount(res?.data?.genres?.legnth);
        setGenres(res?.data?.genres ?? []);
      } catch (e) {
        if (axios.isCancel(e) || e.code === "ERR_CANCELED") return;
        setGenreError(e?.message || "Failed to Load Genres");
      } finally {
        setLoadingGenres(false);
      }
    };
    getGenres();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const getMoviesByGenre = async () => {
      try {
        setLoadingMovies(true);
        setMoviesError(null);

        const { data } = await axios.get(
          `/api/tmdb/movies/${id}/movies-by-genre?page=${page}`,
          { signal: controller.signal },
        );

        setMovies(data?.results ?? []);
        setTotalPages(data?.total_pages ?? 1);
      } catch (e) {
        if (axios.isCancel(e) || e.code === "ERR_CANCELED") return;
        setMoviesError(e?.message || "Failed to Load Genres");
      } finally {
        setLoadingMovies(false);
      }
    };
    getMoviesByGenre();

    return () => {
      controller.abort();
    };
  }, [id, page]);

  const activeGenre = genres.find((g) => String(g.id) === String(id));
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-4 py-8">
          <div>
            <div className="px-6 pt-6">
              <h2 className="text-[30px] font-semibold text-zinc-900">
                Search filter
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-[360px_1fr]">
              <aside className="px-6 pb-6 md:border-r md:border-zinc-200">
                <h3 className="text-base font-semibold text-zinc-900">
                  Genres
                </h3>
                <p className="text-xs text-zinc-500">
                  See lists of movies by genre
                </p>

                <div className="mt-3">
                  <GenreChips
                    genres={genres}
                    activeId={id}
                    isLoading={loadingGenres}
                    error={genreError}
                    baseHref="/pages/genres"
                    skeletonCount={genresCount}
                  />
                </div>
              </aside>

              <section className="px-6 pb-6">
                <h1 className="text-lg font-semibold text-zinc-900">
                  {activeGenre?.name
                    ? `${movies.length} titles in "${activeGenre.name}"`
                    : "Movies"}
                </h1>

                {moviesError && (
                  <p className="mt-2 text-sm text-red-500">{moviesError}</p>
                )}

                <div className="mt-4">
                  <MovieGrid
                    movies={movies}
                    limit={12}
                    skeletonCount={12}
                    isLoading={loadingMovies}
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <Pager
                    page={page}
                    totalPages={Math.min(totalPages, 500)}
                    onPageChange={setPage}
                    maxButtons={3}
                    isLoading={loadingMovies}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
