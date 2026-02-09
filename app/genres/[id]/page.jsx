"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryState, parseAsInteger } from "nuqs";
import MovieGrid from "@/components/ui/MovieGrid";
import Pager from "@/components/ui/Pager";
import { moviesService } from "@/lib/services/movies";

export default function Page() {
  const { id } = useParams();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [moviesError, setMoviesError] = useState(null);
  const [loadingMovies, setLoadingMovies] = useState(true);

  useEffect(() => {
    if (!id) return;

    let alive = true;

    (async () => {
      try {
        setLoadingMovies(true);
        setMoviesError(null);

        const data = await moviesService.moviesByGenre(id, page);
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

  return (
    <>
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
    </>
  );
}
