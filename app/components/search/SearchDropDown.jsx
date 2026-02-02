"use client";

import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchDropdown({
  movies,
  loading,
  empty,
  error,
  onClose,
  query,
}) {
  return (
    <div
      className="
        absolute left-0 right-0 mt-2 z-50
        overflow-hidden
        border border-border bg-card shadow-lg
        rounded-xl sm:rounded-2xl
      "
      role="dialog"
      aria-label="Search results"
    >
      <div
        className="
          max-h-[60vh] sm:max-h-[360px]
          overflow-y-auto
        "
      >
        {loading ? (
          <div className="p-2 sm:p-3 space-y-2 sm:space-y-3">
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
          </div>
        ) : error ? (
          <div className="p-3 text-sm text-red-500">{error}</div>
        ) : empty ? (
          <div className="p-3 text-sm text-muted-foreground">{empty}</div>
        ) : (
          <div className="p-2 sm:p-3 space-y-1 sm:space-y-2">
            {movies.slice(0, 8).map((m) => (
              <ResultRow key={m.id} movie={m} onClose={onClose} />
            ))}

            {movies.length > 8 ? (
              <Link
                href={`/pages/searchResults?query=${encodeURIComponent(query)}&page=1`}
                onClick={onClose}
                className="block w-full mt-2 text-sm py-2 sm:py-2.5 rounded-lg hover:bg-muted text-muted-foreground text-center"
              >
                See all results
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}


function ResultRow({ movie, onClose }) {
  const imgBaseUrl = "https://image.tmdb.org/t/p/w92";
  const title = movie?.title || movie?.original_title || "Untitled";
  const year = movie?.release_date ? movie.release_date.slice(0, 4) : "--";
  const rating =
    typeof movie?.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "--";

  const poster = movie?.poster_path
    ? `${imgBaseUrl}${movie.poster_path}`
    : null;

  return (
    <Link
      href={`/pages/${movie.id}`}
      onClick={onClose}
      className="
        flex items-center gap-2 sm:gap-3
        p-2 sm:p-3
        rounded-lg
        hover:bg-muted transition
      "
    >
      <div
        className="
          shrink-0 overflow-hidden bg-muted
          rounded-md sm:rounded-lg
          w-9 h-12 sm:w-10 sm:h-14
        "
      >
        {poster ? (
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate text-sm sm:text-base">{title}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          ⭐ {rating} <span className="mx-2">•</span> {year}
        </p>
      </div>

      <div className="hidden sm:block text-xs text-muted-foreground hover:text-foreground">
        See more →
      </div>
    </Link>
  );
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3">
      <Skeleton className="w-9 h-12 sm:w-10 sm:h-14 rounded-md sm:rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}
