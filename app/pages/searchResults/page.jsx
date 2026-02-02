"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import MovieGrid from "../../../components/ui/MovieGrid";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GenreChips from "../../../components/ui/GenreChips";
import Pager from "../../../components/ui/Pager";

const LS_KEY = "search_term";

export default function SearchResultsPage() {
  const [storedQuery, setStoredQuery] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY) || "";
      setStoredQuery(saved.trim());
    } catch {
      setStoredQuery("");
    } finally {
      setHydrated(true);
    }
  }, []);

  const [page, setPage] = useState(1);

  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [genres, setGenres] = useState([]);
  const [genresCount, setGenresCount] = useState(10);
  const [genreError, setGenreError] = useState(null);
  const [loadingGenres, setLoadingGenres] = useState(true);

  useEffect(() => {
    setPage(1);
  }, [storedQuery]);

  useEffect(() => {
    if (!hydrated) return;

    if (!storedQuery.trim()) {
      setSearchedMovies([]);
      setSearchError("No search term saved. Search something first.");
      setTotalPages(1);
      setLoadingSearch(false);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        setLoadingSearch(true);
        setSearchError(null);

        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            storedQuery,
          )}&language=en-US&page=${page}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjRhZTgxN2Y1MTQ4ZTkyMDIzMWM1OTBmNTZjZWE1YyIsIm5iZiI6MTc2NzY4ODIyMi4wNzksInN1YiI6IjY5NWNjODFlODI2NmNmOGUyMWRjMmM4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CefpI5lXcMjzRN2Zm-Ap3g5nGh8x2swrJ4Y1MME_HzM`,
            },
            signal: controller.signal,
          },
        );

        const results = res?.data?.results ?? [];
        setSearchedMovies(results);
        setTotalPages(res?.data?.total_pages ?? 1);

        if (results.length === 0) setSearchError("No results found");
      } catch (e) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
        setSearchError(e?.message || "Failed to load search results");
      } finally {
        setLoadingSearch(false);
      }
    })();

    return () => controller.abort();
  }, [storedQuery, page, hydrated]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoadingGenres(true);
        setGenreError(null);

        const res = await axios.get("/api/tmdb/genres", {
          signal: controller.signal,
        });

        const list = res?.data?.genres ?? [];
        setGenres(list);
        setGenresCount(list.length || 10);
      } catch (e) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
        setGenreError(e?.message || "Failed to load genres");
      } finally {
        setLoadingGenres(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8">
          <div className="px-2 sm:px-6 pt-4 sm:pt-6">
            <h1 className="text-xl font-bold">
              Results for “{storedQuery || "..."}”
            </h1>
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
                  activeId={null}
                  isLoading={loadingGenres}
                  error={genreError}
                  baseHref="/pages/genres"
                  skeletonCount={genresCount}
                />
              </div>
            </aside>

            <section className="px-2 pb-6 sm:px-6">
              <h2 className="text-base font-semibold text-foreground sm:text-lg">
                {storedQuery.trim()
                  ? `${searchedMovies.length} results for "${storedQuery}"`
                  : "Search"}
              </h2>

              {searchError && (
                <p className="mt-2 text-sm text-destructive">{searchError}</p>
              )}

              <div className="mt-4">
                <MovieGrid
                  movies={searchedMovies}
                  limit={12}
                  skeletonCount={12}
                  isLoading={loadingSearch}
                />
              </div>

              <div className="mt-8 flex justify-end">
                <Pager
                  page={page}
                  totalPages={Math.min(totalPages, 500)}
                  onPageChange={setPage}
                  maxButtons={3}
                  isLoading={loadingSearch}
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
