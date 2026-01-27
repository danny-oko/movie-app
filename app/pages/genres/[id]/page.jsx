"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import MovieGrid from "../../../../components/ui/MovieGrid";
import Pager from "../../../../components/ui/Pager";
import { Button } from "../../../../components/ui/button";
import { useQueryState, parseAsArrayOf, parseAsInteger } from "nuqs";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = useMemo(() => {
    const raw = searchParams.get("page") || "1";
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParams]);

  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [error, setError] = useState(null);

  const [selectedGenres, setSelectedGenres] = useQueryState(
    "genres",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchGenres() {
      try {
        setLoadingGenres(true);
        const res = await axios.get("/api/tmdb/genres");
        if (!cancelled) setGenres(res?.data?.genres ?? []);
      } catch (err) {
        if (!cancelled) setError(err?.message || "Failed to load genres");
      } finally {
        if (!cancelled) setLoadingGenres(false);
      }
    }

    fetchGenres();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetchMovies() {
      try {
        setLoadingMovies(true);
        setError(null);

        const res = await axios.get(
          `/api/tmdb/movies/${id}/movies-by-genre?page=${page}`,
        );

        if (cancelled) return;

        setMovies(res?.data?.results ?? []);
        setTotalPages(res?.data?.total_pages ?? 1);
        console.log(res.data.results);
        console.log(res.data.total_pages);
      } catch (err) {
        if (!cancelled) setError(err?.message || "Failed to load movies");
      } finally {
        if (!cancelled) setLoadingMovies(false);
      }
    }

    fetchMovies();
    return () => {
      cancelled = true;
    };
  }, [id, page]);

  return (
    <main>
      {genres.map((genre) => (
        <div className="flex flex-wrap gap-2">
          <Button key={genre.id} variant="trailer" size="default">
            {genre.name}
          </Button>
        </div>
      ))}
      <div className="movies">
        <MovieGrid movies={movies} limit={12} skeletonCount={12} />
      </div>
      <div className="pager">
        <Pager
          totalPages={totalPages}
          onPageChange={page}
          maxButtons={5}
          // page={}
        />
      </div>
    </main>
  );
}