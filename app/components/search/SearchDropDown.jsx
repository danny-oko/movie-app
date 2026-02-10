"use client";

import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const LS_KEY = "search_term";

export default function SearchDropdown({
  movies,
  loading,
  empty,
  error,
  onClose,
  query,
}) {
  const saveTerm = (term) => {
    try {
      const t = (term || "").trim();
      if (t) localStorage.setItem(LS_KEY, t);
    } catch {
      console.log("couldn't find movies");
    }
  };

  return (
    <div
      className="
        absolute left-1/2 top-12 z-50
        -translate-x-1/2
        w-[min(720px,92vw)]
        rounded-2xl border border-border bg-card shadow-xl
        overflow-hidden
      "
      role="dialog"
      aria-label="Search results"
    >
      <div className="max-h-[420px] overflow-y-auto">
        {loading ? (
          <div className="p-0">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <RowSkeleton />
                {i !== 3 ? (
                  <div className="px-6 py-2">
                    <Separator />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-6 text-sm text-red-500">{error}</div>
        ) : empty ? (
          <div className="p-6 text-sm text-muted-foreground">{empty}</div>
        ) : (
          <div className="p-0">
            {movies.slice(0, 8).map((m, idx) => (
              <div key={m.id}>
                <ResultRow
                  movie={m}
                  onClose={onClose}
                  onSaveTerm={() => saveTerm(query)}
                />
                {idx !== Math.min(movies.length, 8) - 1 ? (
                  <div className="px-6 py-2">
                    <Separator />
                  </div>
                ) : null}
              </div>
            ))}

            {movies.length > 8 ? (
              <>
                <div className="h-px w-full bg-border" />
                <Link
                  href={`/searchResults?query=${encodeURIComponent(
                    query,
                  )}&page=1`}
                  onClick={() => {
                    saveTerm(query);
                    onClose();
                  }}
                  className="block w-full px-6 py-4 text-sm text-muted-foreground hover:bg-muted text-left"
                >
                  See all results for "{query}"
                </Link>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultRow({ movie, onClose, onSaveTerm }) {
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
      href={`/${movie.id}`}
      onClick={() => {
        onSaveTerm?.();
        onClose();
      }}
      className="flex items-center gap-4 px-6 py-4 hover:bg-muted transition"
    >
      <div className="shrink-0 overflow-hidden bg-muted rounded-md w-[68px] h-[100px]">
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
        <p className="font-semibold truncate text-base">{title}</p>

        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-foreground">{rating}</span>
          <span>/10</span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">{year}</p>
      </div>

      <div className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap">
        See more →
      </div>
    </Link>
  );
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <Skeleton className="shrink-0 rounded-md w-[68px] h-[100px]" />

      <div className="flex-1 flex flex-col">
        <Skeleton className="h-5 w-[60%]" />

        <div className="mt-3 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-10" />
        </div>

        <Skeleton className="mt-3 h-4 w-12" />
      </div>

      <Skeleton className="h-4 w-20" />
    </div>
  );
}
