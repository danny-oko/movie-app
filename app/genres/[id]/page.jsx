"use client";
import React, { useEffect, useState } from "react";

import GenreChips from "@/components/ui/GenreChips";
import MovieGrid from "@/components/ui/MovieGrid";
import Pager from "@/components/ui/Pager";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

import { useParams } from "next/navigation";
import { moviesService } from "@/lib/services/movies";

export default function Page() {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [genres, setGenres] = useState([]);
  const [genresCount, setGenresCount] = useState(8);
  const [genreError, setGenreError] = useState(null);
  const [loadingGenres, setLoadingGenres] = useState(true);

  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(null);
  const [loadingMovies, setLoadingMovies] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoadingGenres(true);
        setGenreError(null);

        const data = await moviesService.genres();
        if (!alive) return;

        const list = data?.genres || [];
        setGenres(list);
        setGenresCount(list.length || 8);
      } catch (e) {
        if (!alive) return;
        setGenreError(e?.message || "Failed to Load Genres");
      } finally {
        if (!alive) return;
        setLoadingGenres(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!id) return;

    let alive = true;

    (async () => {
      try {
        setLoadingMovies(true);
        setMoviesError(null);

        const data = await MoviesService.moviesByGenre(id, page);
        if (!alive) return;

        setMovies(data?.results || []);
        setTotalPages(data?.total_pages || 1);
      } catch (e) {
        if (!alive) return;
        setMoviesError(e?.message || "Failed to Load Movies");
      } finally {
        if (!alive) return;
        setLoadingMovies(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [id, page]);

  const activeGenre = genres.find((g) => String(g.id) === String(id));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8">
          <div>
            <div className="px-2 sm:px-6 pt-4 sm:pt-6">
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl md:text-[30px]">
                Search filter
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[minmax(260px,360px)_1fr]">
              <aside className="px-2 pb-4 sm:px-6 sm:pb-6 md:border-r md:border-border">
                <h3 className="text-base font-semibold text-foreground">
                  Genres
                </h3>
                <p className="text-xs text-muted-foreground">
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

              <section className="px-2 pb-6 sm:px-6">
                <h1 className="text-base font-semibold text-foreground sm:text-lg">
                  {activeGenre?.name
                    ? `${movies.length} titles in "${activeGenre.name}"`
                    : "Movies"}
                </h1>

                {moviesError && (
                  <p className="mt-2 text-sm text-destructive">{moviesError}</p>
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
